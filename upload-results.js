const axios = require('axios');
const fs = require('fs');
const path = require('path');

const jiraBaseUrl = process.env.JIRA_BASE_URL;
const jiraUser = process.env.JIRA_USER;
const jiraApiToken = process.env.JIRA_API_TOKEN;
const reportPath = path.resolve(__dirname, 'results/cucumber-report.json');

const uploadResultsToXray = async () => {
  try {
    if (!fs.existsSync(reportPath)) {
      throw new Error(`Report file not found: ${reportPath}`);
    }

    const report = fs.readFileSync(reportPath, 'utf8');

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

    console.log('Test results uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading test results to Xray:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
};

uploadResultsToXray();
