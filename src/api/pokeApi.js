const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';


export async function obtenerListaDePokemons(offset = 10000, limit = 0)
{
    const response = await fetch(`${URL_BASE}?offset=${limit}&limit=${offset}`);
    const listaPokemons =  await response.json();
    return listaPokemons;
}

export async function obtenerPokemon(id)
{
    const response = await fetch(`${URL_BASE}/${id}`);
    const pokemon = await response.json();
    return pokemon;
}
