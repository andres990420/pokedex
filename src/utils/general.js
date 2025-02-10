import { obtenerEspeciesDePokemons} from "../api/pokeApi.js";

export function obtenerHabilidadOculta(habilidadesPokemon)
{
  const habilidadOculta = habilidadesPokemon.find(ability => ability.is_hidden)
  return habilidadOculta ? habilidadOculta.ability.name : 'No posee habilidad oculta';
}

export function obtenerDescripcion(especiePokemon)
{
  const descripcion = especiePokemon.flavor_text_entries.find(data =>  data.language.name === 'es') ||  
  especiePokemon.flavor_text_entries.find(data => data.language.name === 'en');
  return descripcion ? descripcion.flavor_text : 'Descripcion no disponible';
}

export function obtenerHabilidades(habilidadesPokemon)
{
  const habilidades = []; 
  habilidadesPokemon.map(ability => ability !== undefined ? habilidades.push(ability) : '');

  return habilidades.length > 0 ? habilidades : 'Habilidades no disponibles';
}

export function obtenerTipos(tiposPokemon)
{
  const tipos = [];
  tiposPokemon.map(types => types.type.name != undefined ? tipos.push(types.type.name) : ''); 
  return tipos.length > 0 ? tipos : 'Tipos no disponibles';
}

export async function obtenerListaEspeciePokemons() 
{
  const especiesPokemons = await obtenerEspeciesDePokemons();
  const listaEspeciePokemons = especiesPokemons.results.map(pokemon => pokemon.name);
  return listaEspeciePokemons;
}