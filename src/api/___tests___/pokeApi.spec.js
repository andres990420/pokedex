import { obtenerListaDePokemons, obtenerEspeciesDePokemons, obtenerPokemon, obtenerEspeciePokemon, obtenerHabilidadPokemon, obtenerTipoPokemon } from '../pokeApi';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe('pokeApi', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('obtenerListaDePokemons deberia devolver la lista de pokemons', async () => {
        const data = { results: [{ name: 'bulbasaur' }] };
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );

        const result = await obtenerListaDePokemons();
        expect(result).toEqual(data);
        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000');
    });

    test('obtenerEspeciesDePokemons deberia devolver la lista de especies de pokemons', async () => {
        const data = { results: [{ name: 'bulbasaur' }] };
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );

        const result = await obtenerEspeciesDePokemons();
        expect(result).toEqual(data);
        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=100000');
    });

    test('obtenerPokemon deberia devolver un pokemon en especifico usando su Id', async () => {
        const data = { name: 'bulbasaur' };
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );

        const result = await obtenerPokemon(1);
        expect(result).toEqual(data);
        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
    });

    test('obtenerEspeciePokemon deberia devolver la especie de cualquier pokemon usando su nombre', async () => {
        const data = { name: 'bulbasaur' };
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );

        const result = await obtenerEspeciePokemon('bulbasaur');
        expect(result).toEqual(data);
        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/bulbasaur');
    });

    test('obtenerHabilidadPokemon deberia devolver la habilidad especificada usando su nombre', async () => {
        const data = { name: 'overgrow' };
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );

        const result = await obtenerHabilidadPokemon('overgrow');
        expect(result).toEqual(data);
        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/ability/overgrow');
    });

    test('obtenerTipoPokemon deberia devolver el tipo especificada usando su nombre', async () => {
        const data = { name: 'grass' };
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(data),
            })
        );

        const result = await obtenerTipoPokemon('grass');
        expect(result).toEqual(data);
        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/grass');
    });
});