describe("auth", () => {
    it('Has Airtable API Key', () => {
        cy.auth().then(() => {
            cy.visit('http://localhost:3001')
            cy.window().then(win => {
                expect(win.localStorage.getItem('airtable_api_key')).to.eq(Cypress.env('airtable_api_key'));
            })
        });
    })
})