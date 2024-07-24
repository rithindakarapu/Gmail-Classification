import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Modal from '../components/Modal';
import '../styles/styles.css';

export default function Home() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState([]);
  const [emailCount, setEmailCount] = useState(15);
  const [error, setError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showClassifications, setShowClassifications] = useState(false);

  const fetchEmails = async () => {
    setError(null);
    try {
      const response = await fetch(`/api/emails?count=${emailCount}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmails(data);
        setShowClassifications(false);
      } else {
        setError('Unexpected response format');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const classifyEmails = async () => {
    try {
      const emailPromises = emails.map(async (email) => {
        const response = await fetch('/api/classify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailSnippet: email.snippet }),
        });

        const data = await response.json();
        return { ...email, classification: data.classification };
      });

      const classifiedEmails = await Promise.all(emailPromises);
      setEmails(classifiedEmails);
      setShowClassifications(true);
    } catch (error) {
      console.error('Error classifying emails:', error);
    }
  };

  const renderEmailBody = (email) => {
    const parts = email.payload.parts || [];
    const bodyPart = parts.find(part => part.mimeType === 'text/plain') || parts.find(part => part.mimeType === 'text/html');
    if (bodyPart) {
      const bodyData = bodyPart.body.data;
      const decodedBody = atob(bodyData.replace(/-/g, '+').replace(/_/g, '/'));
      if (bodyPart.mimeType === 'text/html') {
        return <div dangerouslySetInnerHTML={{ __html: decodedBody }} />;
      }
      return <pre>{decodedBody}</pre>;
    }
    return <p>No body content available</p>;
  };

  return (
    <div className="container">
      {session ? (
        <div className="h-full flex flex-col">
          <div className="header">
            <div className="header-left">
              <span className="font-bold">{session.user.name}</span><br />
              <span>{session.user.email}</span>
              <div className="mt-2">
                <label htmlFor="emailCount" className="mr-2"></label>
                <select
                  id="emailCount"
                  value={emailCount}
                  onChange={(e) => setEmailCount(e.target.value)}
                  className="p-2 border rounded"
                >
                  {[5, 10, 15, 20].map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={fetchEmails}
                >
                  Fetch Emails
                </button>
              </div>
            </div>
            <div className="header-right">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => signOut()}
              >
                Sign out
              </button>
              <button
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={classifyEmails}
              >
                Classify
              </button>
            </div>
          </div>
          {error && <p className="error-message">Error: {error}</p>}
          <div className="email-list">
            {emails.map((email) => (
              <div
                key={email.id}
                className="email-item"
                onClick={() => setSelectedEmail(email)}
              >
                {showClassifications && (
                  <span className="email-classification">
                    {email.classification || 'General'}
                  </span>
                )}
                <p><strong>From:</strong> {email.payload.headers.find(header => header.name === 'From').value}</p>
                <p><strong>Subject:</strong> {email.payload.headers.find(header => header.name === 'Subject').value}</p>
                <p>{email.snippet}</p>
              </div>
            ))}
          </div>
          <Modal isOpen={!!selectedEmail} onClose={() => setSelectedEmail(null)}>
            {selectedEmail && (
              <div>
                <h3 className="text-xl font-bold">Full Email</h3>
                <p><strong>From:</strong> {selectedEmail.payload.headers.find(header => header.name === 'From').value}</p>
                <p><strong>Subject:</strong> {selectedEmail.payload.headers.find(header => header.name === 'Subject').value}</p>
                <p>{selectedEmail.snippet}</p>
                {renderEmailBody(selectedEmail)}
              </div>
            )}
          </Modal>
        </div>
      ) : (
        <div className="login-container">
          <button
            className="login-button"
            onClick={() => signIn('google')}
          >
            Login with Google
          </button>
          <div className="api-key-container">
            <label htmlFor="apiKey">Enter OpenAI API Key</label>
            <input
              id="apiKey"
              type="text"
              placeholder="Your OpenAI API Key"
            />
          </div>
        </div>
      )}
    </div>
  );
}
