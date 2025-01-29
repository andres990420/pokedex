import { obtenerEspeciePokemon, obtenerListaDePokemons, obtenerPokemon } from "./api/pokeApi.js";
import Pokemon from "./entities/pokemon.js";
import { obtenerHabilidades, obtenerListaEspeciePokemons} from "./utils/general.js";

const $listaPokemons = document.querySelector('#lista-pokemons');

const $idPokemon = document.querySelector('#id-pokemon');
const $nombrePokemon = document.querySelector('#nombre-pokemon')
const $tipo1Pokemon = document.querySelector('#tipo1-pokemon')
const $tipo2Pokemon = document.querySelector('#tipo2-pokemon')
const $iconoTipo1 = document.querySelector('#tipo-1-svg');
const $iconoTipo2 = document.querySelector('#tipo-2-svg');
const $habilidadPokemon = document.querySelector('#habilidad-pokemon');
const $habilidadOcultaPokemon = document.querySelector('#habilidad-oculta-pokemon');
const $imagenPokemon = document.querySelector('#imagen-pokemon');
const $descripcionPokemon = document.querySelector('#descripcion-pokemon');

const $botonSiguiente = document.querySelector('#boton-siguiente');
const $botonAnterior = document.querySelector('#boton-anterior');
const $botonStats = document.querySelector('#boton-stats');

const $buscadorPokemon = document.querySelector('#buscador-pokemon');
const $botonBuscar = document.querySelector('#boton-buscar')

export async function generarListaPokemon()
{
    const lista = await obtenerListaDePokemons();
    const listaEspeciePokemons = await obtenerListaEspeciePokemons();
    Object.values(lista.results).forEach(pokemon =>
        {
            const nombrePokemon = pokemon.name[0].toUpperCase() + (pokemon.name).substring(1);
            const option = document.createElement('option');
            option.innerText = nombrePokemon;
            option.id = (pokemon.url).replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','');
            option.dataset.name = pokemon.name;
            option.name = pokemon.name;
            option.dataset.specie =  listaEspeciePokemons.find(especie => (pokemon.name).includes(especie));
            $listaPokemons.appendChild(option);    
        })
}

$listaPokemons.onchange = async (event)=>
{
    const pokemonABuscarId = event.target.selectedOptions[0].id;
    const pokemonABuscarNombre = event.target.selectedOptions[0].dataset.specie;

    const pokemon = new Pokemon(await obtenerPokemon(pokemonABuscarId), await obtenerEspeciePokemon(pokemonABuscarNombre));
    pokemon.id !== 1 ? $botonAnterior.removeAttribute('disabled') : '';
    pokemon.id >= $listaPokemons.lastChild.id ? $botonSiguiente.setAttribute('disabled', true) : $botonSiguiente.removeAttribute('disabled');

    definirId(pokemon.id);
    definirNombre(pokemon.name);
    cambiarImagenPokemon(pokemon.sprite);
    definirTipos(pokemon.types);
    definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
    definirDescripcion(pokemon.description)
};

$botonSiguiente.onclick = async () =>
{
    const idActual = $listaPokemons[$listaPokemons.selectedIndex + 1].id;
    const especiePokemon = $listaPokemons[$listaPokemons.selectedIndex + 1].dataset.specie; 

    const pokemon = new Pokemon(await obtenerPokemon(idActual), await obtenerEspeciePokemon(especiePokemon));
    pokemon.id > 1 ? $botonAnterior.removeAttribute('disabled') : '';
    pokemon.id >= $listaPokemons.lastChild.id ? $botonSiguiente.setAttribute('disabled', true) : $botonSiguiente.removeAttribute('disabled');

    $listaPokemons.selectedIndex = $listaPokemons.selectedIndex + 1

    definirId(pokemon.id);
    definirNombre(pokemon.name);
    cambiarImagenPokemon(pokemon.sprite);
    definirTipos(pokemon.types);
    definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
    definirDescripcion(pokemon.description);
};

$botonAnterior.onclick = async ()=>
{
    const idActual = $listaPokemons[$listaPokemons.selectedIndex - 1].id;
    const especiePokemon = $listaPokemons[$listaPokemons.selectedIndex - 1].dataset.specie; 
    if($listaPokemons.selectedIndex === 1)
        {
            $botonAnterior.setAttribute('disabled', true);
        }
    else
        {
            $botonSiguiente.removeAttribute('disabled');
            const pokemon = new Pokemon(await obtenerPokemon(idActual), await obtenerEspeciePokemon(especiePokemon));
            
            $listaPokemons.selectedIndex = $listaPokemons.selectedIndex - 1;

            definirId(pokemon.id);
            definirNombre(pokemon.name);
            cambiarImagenPokemon(pokemon.sprite);
            definirTipos(pokemon.types);
            definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
            definirDescripcion(pokemon.description);
        }
};

$botonBuscar.onclick = async () =>
{
    const pokemonABuscar = Array.from($listaPokemons.options).find(option => option.name === ($buscadorPokemon.value).toLowerCase());
    const idPokemon = pokemonABuscar.id;
    const especiePokemon = pokemonABuscar.dataset.specie;
      
    const pokemon = new Pokemon(await obtenerPokemon(idPokemon), await obtenerEspeciePokemon(especiePokemon));

    $listaPokemons.selectedIndex = Array.from($listaPokemons.options).find(option => option.id === idPokemon).index;
    $buscadorPokemon.value = '';

    definirId(pokemon.id);
    definirNombre(pokemon.name);
    cambiarImagenPokemon(pokemon.sprite);
    definirTipos(pokemon.types);
    definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
    definirDescripcion(pokemon.description);

}

$botonStats.onclick = () => 
    {
        alert('Hola')
    }

function cambiarImagenPokemon(spritePokemon) 
{
    const sprite = spritePokemon === null ? '/images/unknownPokemon.png' : spritePokemon;
    $imagenPokemon.setAttribute('src', sprite);
}

function definirNombre(nombrePokemon)
{
    $nombrePokemon.textContent = nombrePokemon[0].toUpperCase() + nombrePokemon.substring(1);
}

function definirId(idPokemon)
{
    $idPokemon.textContent = idPokemon;
}

function definirHabilidades(habilidadesPokemon, habilidadOculta) 
{
    const habilidades = obtenerHabilidades(habilidadesPokemon);
    
    if(typeof(habilidades) === 'string')
        {
            $habilidadPokemon.textContent = habilidades;
        }
    else
    {
        $habilidadPokemon.textContent = habilidades.length > 1 ? `${habilidades[0]} / ${habilidades[1]}` : habilidades[0];
    }
    $habilidadOcultaPokemon.textContent = habilidadOculta;
}

function definirTipos(tiposPokemon) 
{
    if(typeof(tiposPokemon) === 'string')
        {
            $tipo1Pokemon.textContent =  tiposPokemon;
            $iconoTipo1.setAttribute('src', '/images/unknownPokemon.png');
            $tipo2Pokemon.textContent = '';
            $iconoTipo2.setAttribute('hidden', true);
        }
    else 
    {
        if (tiposPokemon.length > 1) 
            {
                $tipo1Pokemon.textContent = tiposPokemon[0];
                $iconoTipo1.setAttribute('src', `/icons/${tiposPokemon[0]}.svg`);
                $tipo2Pokemon.textContent = '/ ' + tiposPokemon[1];
                $iconoTipo2.removeAttribute('hidden');
                $iconoTipo2.setAttribute('src', `/icons/${tiposPokemon[1]}.svg`);
            }
    
        else 
            {
                $tipo1Pokemon.textContent = tiposPokemon[0];
                $iconoTipo1.setAttribute('src', `/icons/${tiposPokemon[0]}.svg`);
                $tipo2Pokemon.textContent = '';
                $iconoTipo2.setAttribute('hidden', true);
            }
    }
}

function definirDescripcion(descripcion)
{
    $descripcionPokemon.textContent = descripcion;
}