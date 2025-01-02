const UrlBase = 'https://pokeapi.co/api/v2/pokemon/';
const ultimoElemento = 1025;
const primerElemento = 0;


export async function obtenerListaDePokemons()
{
    const response = await fetch(`${UrlBase}?offset=${primerElemento}&limit=${ultimoElemento}`);
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
