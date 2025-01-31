/// <references types = 'cypress'/>

describe('Prueba de pokedex', () => {
  
  beforeEach(() => 
    {
      cy.visit('http://127.0.0.1:5500/src/index.html');
      cy.intercept('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000', {fixture: 'listaPokemons.json'}).as('obtenerListaPokemons');
      cy.intercept('https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=100000', {fixture: 'listaEspeciesPokemons.json'}).as('obtenerListaEspeciesPokemons');
    })
  
  it('La pagina carga correctamente', () => {
    cy.visit('http://127.0.0.1:5500/src/index.html');
  })

  it('Los botones de siguiente y anterior funcionan correctamente', () =>
    {
      cy.intercept('https://pokeapi.co/api/v2/pokemon/1', {fixture: 'bulbasaur.json'}).as('obtenerBulbasaur');
      cy.intercept('https://pokeapi.co/api/v2/pokemon-species/bulbasaur', {fixture: 'bulbasaur-specie.json'}).as('obtenerBulbasaurEspecie');
      cy.intercept('https://pokeapi.co/api/v2/pokemon/2', {fixture: 'ivysaur.json'}).as('obtenerIvysaur');
      cy.intercept('https://pokeapi.co/api/v2/pokemon-species/ivysaur', {fixture: 'ivysaur-specie.json'}).as('obtenerIvysaurEspecie');

      cy.wait(500)
      // Activando el boton de siguiente
      cy.get('#boton-siguiente').click();

      // Verificando que la informacion del pokemon sea correcto
      cy.get('#id-pokemon').should('have.text', '1');

      // Verificando que el pokemon actual este seleccionado en la lista de pokemones
      cy.get('#lista-pokemons').find('option:selected').should('have.text','Bulbasaur')

      // Revisando que el boton anterior se encuentre deshabilidato cuando el id del pokemon sea 1
      cy.get('#boton-anterior').should('have.attr', 'disabled');

      // Cambiando al siguiente pokemon con Id 2
      cy.get('#boton-siguiente').click();
      
      // Revisando que el pokemon es el correcto
      cy.get('#id-pokemon').should('have.text', '2');

      // Revisando que el boton de Anterior ya no este deshabilitado
      cy.get('#boton-anterior').should('have.not.attr', 'disabled');

      // Click el boton de Anterior y revisando que el pokemon es el correcto
      cy.get('#boton-anterior').click();
      cy.get('#id-pokemon').should('have.text', '1');

      // Verificando que el pokemon actual este seleccionado en la lista de pokemones
      cy.get('#lista-pokemons').find('option:selected').should('have.text','Bulbasaur')

    })
  
  it('La barra de busqueda pokemon funciona correctamente', ()=>
    {
      // Escribiendo el nombre del pokemon a buscar
      cy.get('#buscador-pokemon').type('Charmander');

      // Buscando el pokemon con el boton de buscar
      cy.get('#boton-buscar').click()

      // Verificando que la barra de busqueda se haya limpiado correctamente
      cy.get('#buscador-pokemon').should('have.text', '');

      // Verificando la informacion del pokemon sea la adecuada
      cy.get('#id-pokemon').should('have.text', '4');
      cy.get('#lista-pokemons').find('option:selected').should('have.text','Charmander')

    })
  
    it('El evento onChange de la lista de pokemons funciona correctamente', () => 
    {
      cy.wait(500)
      
      cy.intercept('https://pokeapi.co/api/v2/pokemon/1', {fixture: 'bulbasaur.json'}).as('obtenerBulbasaur');
      cy.intercept('https://pokeapi.co/api/v2/pokemon-species/bulbasaur', {fixture: 'bulbasaur-specie.json'}).as('obtenerBulbasaurEspecie');
      
      // Revisando que el pokemon seleccionado usando la lista se vizualice correctamente
      cy.get('#lista-pokemons').select('Bulbasaur');
      cy.get('#id-pokemon').should('have.text', '1');
    })
  

  it('Se vizualiza la informacion del pokemon correctamente', () => 
    {
      cy.intercept('https://pokeapi.co/api/v2/pokemon/1', {fixture: 'bulbasaur.json'}).as('obtenerBulbasaur');
      cy.intercept('https://pokeapi.co/api/v2/pokemon-species/bulbasaur', {fixture: 'bulbasaur-specie.json'}).as('obtenerBulbasaurEspecie');
      
      // Seleccionando un pokemon de la lista
      cy.get('#lista-pokemons').select('Bulbasaur');

      // Revisando que la imagen sea la correcta
      cy.get('#imagen-pokemon')
        .should('have.attr', 'src')
        .and('include', '/pokemon/1');

      // revisando que el id sea el correcto
      cy.get('#id-pokemon').should('have.text', '1');
      
      // revisando que el nombre sea el correcto
      cy.get('#nombre-pokemon').should('have.text', 'Bulbasaur');
      
      // Revisando que los tipos sean los correctos
      cy.get('#tipo1-pokemon').should('have.text', 'grass');
      cy.get('#tipo2-pokemon').should('have.contain', 'poison');
      
      // Revisando que los iconos sean los correctos
      cy.get('#tipo-1-svg')
        .should('have.attr', 'src')
        .and('include', 'grass');
      cy.get('#tipo-2-svg')
        .should('have.attr', 'src')
        .and('include', 'poison');
      
      // Revisando que las habilidades sean las correctas
      cy.get('#habilidad-pokemon').should('contain', 'overgrow')
      cy.get('#habilidad-oculta-pokemon').should('have.text', 'chlorophyll');

      // Revisando que la descripcion del pokemon sea la correcta
      cy.get('#descripcion-pokemon').should('have.text', 'Una rara semilla le fue plantada en el lomo al nacer.\nLa planta brota y crece con este Pokémon.')
    })

    it('Se vizualiza la informacion correctamente para mono-tipos', () => 
      {
        cy.intercept('https://pokeapi.co/api/v2/pokemon/4', {fixture: 'charmander.json'}).as('obtenerCharmander');
        cy.intercept('https://pokeapi.co/api/v2/pokemon-species/charmander', {fixture: 'charmander-specie.json'}).as('obtenerCharmanderEspecie');
        
        // Seleccionando un pokemon de la lista
        cy.get('#lista-pokemons').select('Charmander');
        
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

    it('Se vizualiza la informacion correctamente para pokemons sin informacion disponible', () => 
    {
      cy.intercept('https://pokeapi.co/api/v2/pokemon/10279', {fixture: 'jellicent.json'}).as('obtenerjellicent');
      cy.intercept('https://pokeapi.co/api/v2/pokemon-species/jellicent', {fixture: 'jellicent-specie.json'}).as('obtenerJellicentEspecie');
      
      cy.get('#lista-pokemons').select('Jellicent-female');

      cy.get('#imagen-pokemon')
        .should('have.attr', 'src')
        .and('include', 'unknownPokemon');
      
      // Revisando que se muestre el texto alternativo cuando no hay habilidades
      cy.get('#habilidad-pokemon').should('have.text', 'Habilidades no disponible');
      cy.get('#habilidad-oculta-pokemon').should('have.text', 'No posee habilidad oculta');

      // Revisando que se muestre el texto alternativo cuando no hay tipos disponibles
      cy.get('#tipo1-pokemon').should('have.text', 'Tipos no disponibles');
      cy.get('#tipo-1-svg')
        .should('have.attr', 'src')
        .and('include', 'unknownPokemon');

      // Revisando que la descripcion muestre el texto alternativo
      cy.get('#descripcion-pokemon').should('have.text', 'Descripcion no disponible');
    })

    it('El ultimo pokemon disponoble en la API se muestra correctamente', () => 
    {
      cy.wait(500)
      
      // Seleccionando el ultimo pokemon de la lista
      cy.get('#lista-pokemons').find('option:last-child').then(option => 
        {
          const lastChild = Object.values(option).find(data => data.name).textContent;
          cy.get('#lista-pokemons').select(lastChild);
      });
      
      // Revisando que el boton de siguiente este deshabilitado
      cy.get('#boton-siguiente').should('have.attr', 'disabled');
      
    })
})