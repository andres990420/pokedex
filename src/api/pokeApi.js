const URL_BASE = 'https://pokeapi.co/api/v2';


export async function obtenerListaDePokemons(offset = 100000, limit = 0)
{
    const response = await fetch(`${URL_BASE}/pokemon?offset=${limit}&limit=${offset}`);
    const listaPokemons =  await response.json();
    return listaPokemons;
}

export async function obtenerEspeciesDePokemons(offset = 100000, limit = 0)
{
    const response = await fetch(`${URL_BASE}/pokemon-species?offset=${limit}&limit=${offset}`);
    const listaPokemons =  await response.json();
    return listaPokemons;
}

export async function obtenerPokemon(id)
{
    const response = await fetch(`${URL_BASE}/pokemon/${id}`);
    const pokemon = await response.json();
    return pokemon;
}

export async function obtenerEspeciePokemon(especie)
{
    const response = await fetch(`${URL_BASE}/pokemon-species/${especie}`);
    const especiePokemon = await response.json();
    return especiePokemon;
}

export async function obtenerHabilidadPokemon(habilidad) {
    const response = await fetch(`${URL_BASE}/ability/${habilidad}`);
    const habilidadPokemon = await response.json();
    return habilidadPokemon;
}

export async function obtenerTipoPokemon(tipo) {
    const response = await fetch(`${URL_BASE}/type/${tipo}`);
    const tipoPokemon = await response.json();
    return tipoPokemon;
}