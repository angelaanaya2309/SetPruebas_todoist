describe( 'Test todoist', ()=> {

    before(function () {
        cy.screenshot();
        cy.visit('https://todoist.com/users/showLogin'); 
        cy.wait(5000);
        cy.get('.field').find('input[name="email"]').click().type("angela.anaya.castaneda@gmail.com");
         cy.get('.toggle_password').find('input[name="password"]').click().type("juanda23");
         cy.get('.sel_login').contains('Log in').click();
         cy.wait(5000);
         cy.screenshot();
         
     });

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('todoistd','next-i18next'); 
      });

    it( 'Bandeja de entrada', ()=> {
       
        cy.screenshot();
        cy.get('.item_content').contains('Bandeja de entrada').click();
        cy.wait(5000);
        cy.screenshot();
    });

    it( 'Hoy', ()=> {
        cy.screenshot();
        cy.get('.item_content').contains('Hoy').click();
        cy.wait(5000);
        cy.screenshot();
    });

    it( 'Próximos 7 días', ()=> {
        cy.screenshot();
        cy.get('.item_content').contains('Próximos 7 días').click();
        cy.wait(5000);
        cy.screenshot();
    });

    it( 'Proyectos', ()=> {
        cy.screenshot();
        cy.get('button').contains('Proyectos').click();
        cy.wait(5000);
        cy.screenshot();
    });   
    it( 'Filtros', ()=> {
        cy.screenshot();
        cy.get('button').contains('Filtros').click();
        cy.wait(5000);
        cy.screenshot();
    });
    it( 'Etiquetas', ()=> {
        cy.screenshot();
        cy.get('button').contains('Etiquetas').click();
        cy.wait(5000);
        cy.screenshot();
    });
       
} );