import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { emailSnippet } = req.body;

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Classify the following email snippet into one of the categories: Important, Promotions, Social, Marketing, Spam, General. If none of the categories match, use General.
        
        Here are some example classifications:
        
        Email Snippet: "Meeting at 3 PM with the team to discuss the project." 
        Classification: Important

        Email Snippet: "50% off on all items in our store! Limited time offer!"
        Classification: Promotions

        Email Snippet: "Your friend commented on your photo."
        Classification: Social

        Email Snippet: "Check out our new blog post on digital marketing strategies."
        Classification: Marketing

        Email Snippet: "You have won a million dollars! Click here to claim your prize."
        Classification: Spam

        Email Snippet: "Reminder to complete your profile for better recommendations."
        Classification: General

        Now, classify the following email snippet:
        
        Email Snippet: "${emailSnippet}"
        
        Classification:`,
        max_tokens: 10,
        temperature: 0,
      });

      const classification = response.data.choices[0].text.trim();

      res.status(200).json({ classification });
    } catch (error) {
      console.error('Error classifying email:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to classify email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
