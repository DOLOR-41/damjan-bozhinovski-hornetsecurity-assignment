# ToDo Application — Test Plan (Gherkin)
# Application: Cypress Kitchen Sink TodoMVC fork
# URL: http://localhost:8080/todo

Feature: Todo list management
  As a user
  I want to create, update, and delete tasks
  So that I can track what needs to be done

  Background:
    Given I am on the todo application page
    And the todo list contains the default seeded items

  # --- Display & defaults ---

  Scenario: Default todos are shown on first visit
    Then I should see 2 todo items
    And the first item should be "Pay electric bill"
    And the last item should be "Walk the dog"

  Scenario: Todo counter reflects active items
    Then the items-left counter should show "2 items left"

  # --- Create ---

  Scenario Outline: Add a new todo item
    When I add a new todo "<title>"
    Then I should see <count> todo items
    And the last todo item should be "<title>"

    Examples:
      | title           | count |
      | Feed the cat    | 3     |
      | Buy groceries   | 3     |
      | Schedule dentist| 3     |

  Scenario: Reject adding an empty todo
    When I try to add a new todo with only whitespace
    Then I should still see 2 todo items
    And the new-todo input should be empty or unchanged in count

  # --- Update (complete / edit) ---

  Scenario: Mark a single todo as completed
    When I mark "Pay electric bill" as completed
    Then "Pay electric bill" should appear as completed
    And the items-left counter should show "1 item left"

  Scenario: Edit a todo title via double-click
    When I double-click "Walk the dog" and change the title to "Walk the cat"
    And I confirm the edit
    Then I should see a todo item "Walk the cat"
    And I should not see a todo item "Walk the dog"

  Scenario: Cancel editing with Escape restores the original title
    When I double-click "Walk the dog" and change the title to "Temporary title"
    And I cancel the edit with Escape
    Then I should see a todo item "Walk the dog"

  Scenario: Mark all todos as completed
    When I click "Mark all as complete"
    Then all visible todo items should be completed
    And the items-left counter should show "0 items left"

  # --- Filters ---

  Scenario: Filter to show only active todos
    Given "Pay electric bill" is marked completed
    When I select the "Active" filter
    Then I should see 1 todo item
    And the visible item should be "Walk the dog"
    And "Pay electric bill" should not be visible in the list

  Scenario: Filter to show only completed todos
    Given "Pay electric bill" is marked completed
    When I select the "Completed" filter
    Then I should see 1 todo item
    And the visible item should be "Pay electric bill"
    And "Walk the dog" should not be visible in the list

  # --- Delete ---

  Scenario: Delete a single todo
    When I delete the todo "Walk the dog"
    Then I should see 1 todo item
    And "Walk the dog" should not be visible in the list

  Scenario: Clear all completed todos
    Given "Pay electric bill" is marked completed
    When I click "Clear completed"
    Then I should see 1 todo item
    And "Pay electric bill" should not be visible in the list
    And the "Clear completed" button should not be visible
