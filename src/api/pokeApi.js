const UrlBase = 'https://pokeapi.co/api/v2/pokemon/';


export async function obtenerListaDePokemons(offset = 10000, limit = 0)
{
    const response = await fetch(`${UrlBase}?offset=${limit}&limit=${offset}`);
    const listaPokemons =  await response.json();
    return listaPokemons;
}

export async function obtenerPokemonPorNombre(nombre)
{
    const response = await fetch(`${UrlBase}${nombre}`)
    const pokemon = await response.json()
    return pokemon;
}

export async function obtenerPokemonPorId(id)
{
    const response = await fetch(`${UrlBase}/${id}`);
    const pokemon = await response.json();
    return pokemon;
}
