# features/user-authentication.feature

Feature: User Authentication

  In order to ensure secure access to the system
  As a registered user
  I want to be able to register and log in

  @SCRUM-2
  Scenario: Registering a new user
    Given the system is ready for a new user
    When I register a user with username "testuser1" and password "password123"
    Then the user "testuser1" should exist in the system

  @SCRUM-2
  Scenario: Successful login with correct credentials
    Given the system is ready for a new user
    And I register a user with username "testuser2" and password "password123"
    When I attempt to log in with username "testuser2" and password "password123"
    Then the login should be successful

  @SCRUM-2
  Scenario: Unsuccessful login with incorrect password
    Given the system is ready for a new user
    And I register a user with username "testuser3" and password "password123"
    When I attempt to log in with username "testuser3" and password "wrongpassword"
    Then the login should fail with an error "Invalid password."
