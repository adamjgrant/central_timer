describe('Open app', () => {
  it('passes', () => {
    cy.visit('http://localhost:3001')
  })
})

describe('Get timer sets', () => {
  it('loads fixture data', () => {
    cy.fixture('timer_sets').as('timerSetJson');
    cy.visit('http://localhost:3001')
    cy.stub(m.timer_set_library.act, "get_all_timer_sets", () => {
      return timerSetJson;
    })
  })
})