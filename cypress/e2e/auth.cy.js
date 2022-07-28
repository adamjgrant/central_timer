describe("auth", () => {
    it('Has Airtable API Key', () => {
        cy.auth('abc');
        cy.visit('http://localhost:3001');
        // expect(localStorage.getItem('airtable_api_key')).to.eq('dontworryaboutit');
    })
})