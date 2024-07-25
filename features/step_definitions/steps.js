// features/step_definitions/steps.js

const { Given, When, Then, Before } = require('@cucumber/cucumber');
const assert = require('assert');

// In-memory data storage for demonstration
let users = {};

// Before each scenario, reset the users object to isolate data between tests
Before(function () {
  users = {};
});

Given('the system is ready for a new user', function () {
  // This could be used to reset state or ensure the system is in a known state
  console.log('System is ready for a new user.');
});

When('I register a user with username {string} and password {string}', function (username, password) {
  if (users[username]) {
    throw new Error(`User ${username} already exists.`);
  }
  // Store the user data in our in-memory storage
  users[username] = { password };
  console.log(`User ${username} registered.`);
});

Then('the user {string} should exist in the system', function (username) {
  assert(users[username], `User ${username} does not exist.`);
  console.log(`User ${username} exists in the system.`);
});

When('I attempt to log in with username {string} and password {string}', async function (username, password) {
  try {
    const user = users[username];
    if (!user) {
      throw new Error(`User ${username} does not exist.`);
    }
    if (user.password !== password) {
      throw new Error('Invalid password.');
    }
    this.currentUser = user;
    this.loginError = null; // Clear any previous login errors
    console.log(`User ${username} logged in successfully.`);
  } catch (error) {
    this.loginError = error.message; // Capture login errors
    console.log(`Login failed with error: ${this.loginError}`);
  }
});

Then('the login should be successful', function () {
  if (!this.currentUser) {
    throw new Error('Login was not successful.');
  }
  console.log('Login was successful.');
});

Then('the login should fail with an error {string}', function (expectedErrorMessage) {
  if (!this.loginError) {
    throw new Error('Expected login to fail, but it succeeded.');
  }
  assert.strictEqual(this.loginError, expectedErrorMessage, `Expected error message "${expectedErrorMessage}", but got "${this.loginError}"`);
});
