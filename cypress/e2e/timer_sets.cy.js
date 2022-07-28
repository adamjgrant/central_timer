describe('Open app', () => {
  it('passes', () => {
    cy.visit('http://localhost:3001')
  })
})

describe('Get timer sets', () => {
  it('loads fixture data', () => {
    cy.fixture('timer_sets').then(json => {
      cy.auth();
      // cy.stub(m.timer_set_library.act, "get_all_timer_sets").returns(json);
    })
  })
})