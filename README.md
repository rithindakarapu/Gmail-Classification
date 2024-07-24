
# Email Classifier

This project is a web application that fetches emails from a user's Gmail account, classifies them into categories using OpenAI API, and displays them with classifications.

## Features

- Fetch emails from Gmail
- Classify emails into categories: Important, Promotions, Social, Marketing, Spam, General
- Display full email content on click
- Sign in with Google
- Responsive UI with TailwindCSS

## Technologies Used

- Next.js
- NextAuth.js for authentication
- OpenAI API for email classification
- TailwindCSS for styling
- React for UI components

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/gmail-email-classifier.git
   cd gmail-email-classifier

2. **Install Dependencies**

   ```bash
   npm install
3. **Create .env.local file in the root directory and add your environment variables**

   ```bash
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   OPENAI_API_KEY=your-openai-api-key
4. **Run the development server**

   ```bash
   npm run dev
5. **Open your browser and navigate to**

   ```bash
   http://localhost:3000

## Prerequisites

- Node.js
- npm or yarn
- Google Cloud Platform account with OAuth 2.0 credentials
- OpenAI API key

## Project Structure

- **Pages**: Contains Next.js pages
  - **api**: Contains API routes for fetching and classifying emails
  - **index.js**: Main page for the application
- **components**: Contains React components
  - **Modal.js**: Modal component for displaying full email content
- **styles**: Contains CSS files
  - **styles.css**: Custom styles for the application

## Usage

1. **Login with Google**

   Click on the \"Login with Google\" button to authenticate with your Gmail account.

2. **Fetch Emails**

   Select the number of emails to fetch from the dropdown and click the \"Fetch Emails\" button.

3. **Classify Emails**

   Click on the \"Classify\" button to classify the fetched emails using the OpenAI API.

4. **View Full Email**

   Click on any email snippet to view the full email content in a modal.

## Customization

- **Styling**

  You can customize the styling by editing the \`styles/styles.css\` file.

- **Email Classification**

  You can update the classification logic by modifying the prompt in \`pages/api/classify.js\`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [OpenAI](https://openai.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)

## Author

Rithin Dakarapu

For any inquiries or questions, feel free to contact me at drithin2004@gmail.com.
"
