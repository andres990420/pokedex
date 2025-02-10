import { beforeEach, describe, expect, jest } from '@jest/globals'
import {obtenerDescripcion, obtenerHabilidadOculta, obtenerHabilidades, obtenerListaEspeciePokemons, obtenerTipos} from '../general.js'
import { obtenerEspeciePokemon } from '../../api/pokeApi.js';

describe('obtenerDescripcion', () => {

    it('obtenerDescripcion Deberia obtener la descripcion del pokemon en espaniol antes que en ingles', ()=>{
        const data = {
            flavor_text_entries:[
            {
                flavor_text:"Descripcion ingles",
                language:{name:"en"}
            },
            {
                flavor_text:"Descripcion espaniol",
                language:{name:"es"}
            }]}

        const result = obtenerDescripcion(data);
        expect(result).toEqual('Descripcion espaniol');
    })

    it('obtenerDescripcion Deberia obtener la descripcion del pokemon en ingles si no hay en espaniol', ()=>{
        const data = {
            flavor_text_entries:[
            {
                flavor_text:"Descripcion ingles",
                language:{name:"en"}
            },
            {
                flavor_text:"Descripcion 2",
                language:{name:"br"}
            }]}

        const result = obtenerDescripcion(data);
        expect(result).toEqual('Descripcion ingles');
    })

    it('obtenerDescripcion Deberia devolver "Descripcion no disponible" si no hay descripciones disponibles', ()=>{
        const data = {
            flavor_text_entries:[]}

        const result = obtenerDescripcion(data);
        expect(result).toEqual('Descripcion no disponible');
    })
});

describe('ObtenerHabilidades', () => {

    it('obtenerHabilidades Deberia devolver las todas las habilidades de un pokemon excluyendo las undefinend', () =>{
        const data = [
            'habilidad 1',
            'habilidad 2',
            undefined
        ]

        const result = obtenerHabilidades(data);
        expect(result).toEqual(['habilidad 1', 'habilidad 2']);
    });

    it('obtenerHabilidades Deberia devolver "Habilidades no disponibles" cuando no se tenga ninguna habilidad', () =>{
        const data = []

        const result = obtenerHabilidades(data);
        expect(result).toEqual("Habilidades no disponibles");
    });
});

describe('obtenerHabilidadOculta', () => {
    it('obtenerHabilidadOculta deberia devolver la habilidad oculta del pokemon', ()=>{
        const data = [
            {
                ability:{name: "habilidad oculta"},
                is_hidden : true
            }
        ];
        const result = obtenerHabilidadOculta(data);
        expect(result).toEqual('habilidad oculta')
    });

    it('obtenerHabilidadOculta deberia devolver "No posee habilidad oculta" si no hay habilidad oculta', ()=>{
        const data = [
            {
                ability:{name: "habilidad normal"},
                is_hidden : false
            }
        ];
        const result = obtenerHabilidadOculta(data);
        expect(result).toEqual('No posee habilidad oculta')
    });
});

describe("ObtenerTipos", () => {
    it("ObtenerTipos deberia devolver los tipos del pokemon", () => {
        const data = [
            {
                type: {name : 'tipo 1'}
            },
            {
                type: {name : 'tipo 2'}
            }
        ]

        const result = obtenerTipos(data);
        expect(result).toEqual(['tipo 1', 'tipo 2']);
    });

    it("ObtenerTipos deberia devolver 'Tipos no disponibles' si el pokemon no tiene tipos del pokemon", () => {
        const data = [
            {
                type: {name : undefined}
            },
            {
                type: {name : undefined}
            }
        ]

        const result = obtenerTipos(data);
        expect(result).toEqual('Tipos no disponibles');
    });
});

describe("obtenerListaEspeciePokemons", () => {
    
    it('obtenerListaEspeciePokemons deberia devolver la lista de especie de pokemons', async ()=>{
        global.fetch = jest.fn(() => {
            Promise.resolve({
                json : () => Promise.resolve({}),
            })
        });
        
        const data = {
            results : [
                {
                    name : 'pokemon especie 1'
                },
                {
                    name: 'pokemon especie 2'
                }
        ]};
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );
    
       const result = await obtenerListaEspeciePokemons(data);
       expect(result).toEqual(['pokemon especie 1', 'pokemon especie 2']);
    });

})