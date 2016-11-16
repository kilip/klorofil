Feature: User

  Scenario: Login into klorofil
    Given I am on the homepage
    Then I should see "klorofil"
    And I should see "You can use admin as username and password"
    When I fill in the following:
      | username | admin |
      | password | admin |
    And I press "login"
    And I wait ajax to finish
    Then I should see "Homepage"
    And I should see "Welcome to Klorofil"