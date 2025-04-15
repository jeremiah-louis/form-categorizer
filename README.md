# Form Categorizer

A Node.js application that collects form responses and suggests career paths using the WetroCloud SDK.

## Prerequisites

- Node.js installed on your system
- A Wetrocloud API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   This will install:
   - wetro-sdk
   - dotenv (for environment variable management)

3. Create a `.env` file in the root directory and add your WetroCloud API key:
   ```bash
   WETRO_API_KEY=your_api_key_here
   ```

## Usage

Run the application:
```bash
node index.js
```

The application will:
1. Use sample form questions and answers
2. Format the responses according to the required structure
3. Send the data to Wetrocloud's categorization endpoint
4. Display the form responses and the suggested career path

## Features

- 15 predefined career-related questions
- Sample answers for demonstration
- Integration with Wetrocloud's categorization service
- JSON-formatted output of form responses and career suggestions
- Environment variable management with dotenv

## Project Structure

```
form-categorizer/
├── .env                 # Environment variables (not tracked by git)
├── .gitignore          # Git ignore rules
├── README.md           # Project documentation
├── index.js            # Main application file
└── package.json        # Project dependencies and scripts
```

## Note

This is a demonstration application using sample data. In a production environment, you would:
1. Collect real user input
2. Store the responses securely
3. Handle the API key more securely
4. Add proper error handling and validation 
