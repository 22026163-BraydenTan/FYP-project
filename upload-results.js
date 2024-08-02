// Import the necessary modules
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Retrieve JIRA configuration from environment variables
const jiraBaseUrl = process.env.JIRA_BASE_URL;
const jiraUser = process.env.JIRA_USER;
const jiraApiToken = process.env.JIRA_API_TOKEN;

// Resolve the path to the Cucumber report file
const reportPath = path.resolve(__dirname, 'results/cucumber-report.json');

// Function to upload test results to Xray
const uploadResultsToXray = async () => {
  try {
    // Check if the report file exists
    if (!fs.existsSync(reportPath)) {
      throw new Error(`Report file not found: ${reportPath}`);
    }

    // Read the content of the report file
    const report = fs.readFileSync(reportPath, 'utf8');

    // Send a POST request to Xray API to upload the test results
    const response = await axios.post(
      `${jiraBaseUrl}/rest/raven/1.0/import/execution/cucumber`,
      report,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${jiraUser}:${jiraApiToken}`).toString('base64')}`
        }
      }
    );

    // Log a success message with the response data
    console.log('Test results uploaded successfully:', response.data);
  } catch (error) {
    // Log an error message if the upload fails
    console.error('Error uploading test results to Xray:', error.response ? error.response.data : error.message);
    
    // Log additional error details if available
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
};

// Execute the function to upload test results to Xray
uploadResultsToXray();
