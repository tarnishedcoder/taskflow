describe('Task Board', () => {
  beforeEach(() => {
    cy.visit('/'); // thanks to baseUrl, this loads http://localhost:5173
  });

  it('loads the board with three columns', () => {
    cy.contains('To Do').should('be.visible');
    cy.contains('In Progress').should('be.visible');
    cy.contains('Done').should('be.visible');
  });

  it('adds a new task to the To Do column', () => {
    const taskTitle = `Test task ${Date.now()}`;

    cy.get('.column').first().within(() => {
      cy.get('input[placeholder="Enter task title..."]').type(taskTitle);
      cy.contains('button', 'Add Task').click();
    });

    cy.contains(taskTitle).should('be.visible');
  });
});