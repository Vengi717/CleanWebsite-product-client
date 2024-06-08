before(() => {

  it('login', () => {
    cy.visit('/');
    cy.contains('Apply Job');
    cy.get('*[class="btn btn-primary account-btn"]').click()
    cy.contains('Welcome');
  });
})

describe('Job Seeker Story', () => {
  it('Applying job', () => {
 // cy.visit('/access_job_seeker/welcome');
    cy.get('*[class="la la-dashboard"]').click()
    cy.contains('Job seeker dashboard').click()
    cy.contains('All Jobs').click()
    cy.contains('T_Admin').click()
  //  cy.wait(3000)
   // cy.scrollTo(0, 0)
    cy.get('[id=applyforjob]').click()

    
    //cy.visit('/');
  //  cy.contains('Apply Job');
  //  cy.get('*[class="btn btn-primary account-btn"]').click()
   // cy.contains('Welcome');
  });
});