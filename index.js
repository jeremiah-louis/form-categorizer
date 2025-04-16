import Wetrocloud from 'wetro-sdk'
import dotenv from 'dotenv'

// Load environment variables from .env file
// This allows us to securely store sensitive information like API keys
dotenv.config()

// Initialize the SDK
const client = new Wetrocloud({
    apiKey: process.env.WETRO_API_KEY // You'll need to set this environment variable
});

/*
Expected JSON shape for form responses:
This is how the data should be structured when sending to the API
[
    {
        question: "What are your favorite subjects in school?",
        answer: "Mathematics and Computer Science"
    },
    {
        question: "Do you prefer working alone or in a team?",
        answer: "I prefer working in a team"
    }
]
*/

// List of questions that will be asked in the form
// These are predefined questions about career preferences and skills
const formQuestions = [
    "What are your favorite subjects in school?",
    "Do you prefer working alone or in a team?",
    "How do you handle problem-solving?",
    "Are you more interested in technical or business aspects?",
    "How do you feel about learning new technologies?",
    "Do you enjoy working with data and analytics?",
    "How do you handle deadlines and pressure?",
    "Are you more interested in building products or managing them?",
    "Do you enjoy coding or would you prefer other technical tasks?",
    "How important is work-life balance to you?",
    "Do you prefer structured or flexible work environments?",
    "How do you feel about continuous learning?",
    "Are you more interested in front-end or back-end development?",
    "How do you handle conflicts in a team?",
    "What are your long-term career goals?"
];

// Sample answers for demonstration purposes
// In a real application, these would be collected from user input
const sampleAnswers = [
    "Mathematics and Computer Science",
    "I prefer working in a team",
    "I like to break problems down systematically",
    "I'm more interested in technical aspects",
    "I enjoy learning new technologies",
    "I find data analysis interesting",
    "I work well under pressure",
    "I prefer building products",
    "I enjoy coding",
    "Work-life balance is important to me",
    "I prefer flexible environments",
    "I love continuous learning",
    "I'm interested in both front-end and back-end",
    "I handle conflicts diplomatically",
    "I want to become a senior developer"
];

// Function to create the form responses in the required format:
// This function takes the questions and answers arrays and combines them
// into the required JSON structure shown above
function createFormResponses(questions, answers) {
    return questions.map((question, index) => ({
        question: question,
        answer: answers[index]
    }));
}

// Function to get career path suggestion from WetroCloud's API
// This function:
// 1. Takes the formatted responses
// 2. Sends them to the API
// 3. Returns the suggested career path and reasoning
async function getCareerPathSuggestion(formResponses) {
    try {
        // Call the Wetrocloud API's categorize endpoint
        const response = await client.categorize({
            resource: JSON.stringify(formResponses), // Convert responses to JSON string
            type: "text",
            json_schema: { career_path: "", reason: "" }, // Define the expected response structure
            categories: [
                "DevOps",
                "Product Management",
                "Software Engineer"
            ],
            prompt: "Suggest a good career path based on the form responses and give your reason why"
        });

        return response;
    } catch (error) {
        // If there's an error, log it and throw it to be handled by the caller
        console.error("Error getting career path suggestion:", error);
        throw error;
    }
}

// Main function that runs the application
// This is the entry point of our program
async function main() {
    try {
        // Step 1: Create form responses in the required format
        const formResponses = createFormResponses(formQuestions, sampleAnswers);
        
        // Step 2: Get career path suggestion from the API
        const suggestion = await getCareerPathSuggestion(formResponses);
        
        // Step 3: Display the results
        console.log("\nForm Responses:");
        formResponses.forEach((response, index) => {
            console.log(`\nQuestion ${index + 1}: ${response.question}`);
            console.log(`Answer: ${response.answer}`);
        });

        console.log("\nCareer Path Suggestion:");
        console.log(JSON.stringify(suggestion, null, 2));
    } catch (error) {
        // Handle any errors that occur during execution
        console.error("An error occurred:", error);
    }
}

// Run the application
main(); 
