describe('Prueba de pokedex', () => {
  
  beforeEach(() => 
    {
      cy.visit('http://127.0.0.1:5500/index.html');  
    })
  
  it('La pagina carga correctamente', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
  })

  it('Los botones de siguiente y anterior funcionan correctamente', () =>
    {
      cy.get('#boton-siguiente').click();
      cy.get('#id-pokemon').should('have.text', '1');
      cy.get('#boton-anterior').should('have.attr', 'disabled');
      cy.get('#boton-siguiente').click();
      cy.get('#id-pokemon').should('have.text', '2');
      cy.get('#boton-anterior').should('have.not.attr', 'disabled');
      cy.get('#boton-anterior').click();
      cy.get('#id-pokemon').should('have.text', '1');

    })
  
  it('El buscador funciona correctamente', () => 
    {
      cy.get('select').select('Bulbasaur');
      cy.get('#id-pokemon').should('have.text', '1');
    })
  

  it('Se vizualiza la informacion correctamente', () => 
    {
      cy.get('select').select('Hydrapple');
      
      // Revisando que la imagen sea la correcta
      cy.get('#imagen-pokemon')
        .should('have.attr', 'src')
        .and('include', '/pokemon/1019');

      // revisando que el id sea el correcto
      cy.get('#id-pokemon').should('have.text', '1019');
      
      // revisando que el nombre sea el correcto
      cy.get('#nombre-pokemon').should('have.text', 'Hydrapple');
      
      // Revisando que los tipos sean los correctos
      cy.get('#tipo1-pokemon').should('have.text', 'grass');
      cy.get('#tipo2-pokemon').should('have.contain', 'dragon');
      
      // Revisando que los iconos sean los correctos
      cy.get('#tipo-1-svg')
        .should('have.attr', 'src')
        .and('include', 'grass');
      cy.get('#tipo-2-svg')
        .should('have.attr', 'src')
        .and('include', 'dragon');
      
      // Revisando que las habilidades sean las correctas
      cy.get('#habilidad-pokemon').should('contain', 'supersweet-syrup').and('contain', 'regenerator');
      cy.get('#habilidad-oculta-pokemon').should('have.text', 'sticky-hold');
    })

    it('Se vizualiza la informacion correctamente para mono-tipos', () => 
      {
        cy.get('select').select('Charmander');
        
        // Revisando que los tipos sean los correctos
        cy.get('#tipo1-pokemon').should('have.text', 'fire');
        cy.get('#tipo2-pokemon').should('have.contain', '');
        
        // Revisando que los iconos sean los correctos
        cy.get('#tipo-1-svg')
          .should('have.attr', 'src')
          .and('include', 'fire');
        cy.get('#tipo-2-svg')
          .should('have.not.attr', 'src');
      })

    it('Se vizualiza la informacion correctamente para pokemons sin habilidades ocultas', () => 
    {
      cy.get('select').select('Kakuna');
      
      // Revisando que las habilidades sean las correctas
      cy.get('#habilidad-oculta-pokemon').should('have.text', '');
    })

    it('El ultimo pokemon se muestra correctamente', () => 
    {
      cy.get('select').select('Pecharunt');
      
      // Revisando que la imagen sea la correcta
      cy.get('#imagen-pokemon')
        .should('have.attr', 'src')
        .and('include', '/pokemon/1025');

      // revisando que el id sea el correcto
      cy.get('#id-pokemon').should('have.text', '1025');
      
      // revisando que el nombre sea el correcto
      cy.get('#nombre-pokemon').should('have.text', 'Pecharunt');
      
      // Revisando que los tipos sean los correctos
      cy.get('#tipo1-pokemon').should('have.text', 'poison');
      cy.get('#tipo2-pokemon').should('have.contain', 'ghost');
      
      // Revisando que los iconos sean los correctos
      cy.get('#tipo-1-svg')
        .should('have.attr', 'src')
        .and('include', 'poison');
      cy.get('#tipo-2-svg')
        .should('have.attr', 'src')
        .and('include', 'ghost');
      
      // Revisando que las habilidades sean las correctas
      cy.get('#habilidad-pokemon').should('have.text', 'poison-puppeteer');
      cy.get('#habilidad-oculta-pokemon').should('have.text', '');

      // Revisando que el boton de siguiente este deshabilitado
      cy.get('#boton-siguiente').should('have.attr', 'disabled');
    })
})