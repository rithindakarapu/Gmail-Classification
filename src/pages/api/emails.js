import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    });

    // Refresh the access token if expired
    auth.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // Store the refresh token in session or database
        session.refreshToken = tokens.refresh_token;
      }
      session.accessToken = tokens.access_token;
    });

    await auth.getAccessToken(); // Ensure the access token is refreshed if expired

    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: req.query.count,
    });

    const messages = response.data.messages || [];

    const emailPromises = messages.map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });
      return email.data;
    });

    const emails = await Promise.all(emailPromises);

    res.status(200).json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Error fetching emails' });
  }
}
