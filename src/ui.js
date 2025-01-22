import { obtenerListaDePokemons, obtenerPokemon } from "./api/pokeApi.js";
import Pokemon from "./entities/pokemon.js";

const $buscadorPokemons = document.querySelector('select');

const $idPokemon = document.querySelector('#id-pokemon');
const $nombrePokemon = document.querySelector('#nombre-pokemon')
const $tipo1Pokemon = document.querySelector('#tipo1-pokemon')
const $tipo2Pokemon = document.querySelector('#tipo2-pokemon')
const $iconoTipo1 = document.querySelector('#tipo-1-svg')
const $iconoTipo2 = document.querySelector('#tipo-2-svg')
const $habilidadPokemon = document.querySelector('#habilidad-pokemon')
const $habilidadOcultaPokemon = document.querySelector('#habilidad-oculta-pokemon')
const $imagenPokemon = document.querySelector('#imagen-pokemon');

const $botonSiguiente = document.querySelector('#boton-siguiente');
const $botonAnterior = document.querySelector('#boton-anterior');


export async function generarListaPokemon()
{
    const lista = await obtenerListaDePokemons();
    Object.values(lista.results).forEach(pokemon =>
        {
            let nombrePokemon = pokemon.name[0].toUpperCase() + (pokemon.name).substring(1);
            const option = document.createElement('option');
            option.innerText = nombrePokemon;
            option.dataset.id = (pokemon.url).replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','');
            $buscadorPokemons.appendChild(option);    
        })
}

$buscadorPokemons.onchange = async (event)=>
    {
        const pokemonABuscar = event.target.selectedOptions[0].dataset.id
        if(pokemonABuscar !== 'Buscar')
            {
                const pokemon = new Pokemon(await (obtenerPokemon(pokemonABuscar)));
                pokemon.id !== 1 ? $botonAnterior.removeAttribute('disabled') : '';
                pokemon.id >= $buscadorPokemons.lastChild.dataset.id ? $botonSiguiente.setAttribute('disabled', true) : $botonSiguiente.removeAttribute('disabled');
                
                definirId(pokemon.id);
                definirNombre(pokemon.name);
                cambiarImagenPokemon(pokemon.sprite);
                definirTipos(pokemon.types);
                definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
            }
    };

$botonSiguiente.onclick = async () =>
{
    let idActual;
    $idPokemon.textContent !== '???' ? idActual = Number($idPokemon.textContent) : idActual = 0;
    
    const pokemon = new Pokemon(await obtenerPokemon(idActual+1));
    pokemon.id > 1 ? $botonAnterior.removeAttribute('disabled') : '';
    pokemon.id >= $buscadorPokemons.lastChild.dataset.id ? $botonSiguiente.setAttribute('disabled', true) : $botonSiguiente.removeAttribute('disabled');

    definirId(pokemon.id);
    definirNombre(pokemon.name);
    cambiarImagenPokemon(pokemon.sprite);
    definirTipos(pokemon.types);
    definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
    
};

$botonAnterior.onclick = async ()=>
{
    const idActual = Number($idPokemon.textContent)
    if(idActual === 1)
        {
            $botonAnterior.setAttribute('disabled', true)
        }
    else
        {
            $botonSiguiente.removeAttribute('disabled');
            const pokemon = new Pokemon(await obtenerPokemon(idActual-1));
            definirId(pokemon.id);
            definirNombre(pokemon.name);
            cambiarImagenPokemon(pokemon.sprite);
            definirTipos(pokemon.types);
            definirHabilidades(pokemon.abilities, pokemon.hiddenAbility);
        }
};


function cambiarImagenPokemon(spritePokemon) 
{
    let sprite;
    spritePokemon === null ? sprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png' : sprite = spritePokemon;
    $imagenPokemon.setAttribute('src', sprite);
}

function definirNombre(nombrePokemon)
{
    let nombre = nombrePokemon[0].toUpperCase() + nombrePokemon.substring(1);
    $nombrePokemon.textContent = nombre;
}

function definirId(idPokemon)
{
    $idPokemon.textContent = idPokemon;
}

function definirHabilidades(habilidadesPokemon, habilidadOculta) {
    
    $habilidadPokemon.textContent = habilidadesPokemon[1] !== undefined ? 
        `${habilidadesPokemon[0]} / ${habilidadesPokemon[1]}` : habilidadesPokemon[0];
    $habilidadOcultaPokemon.textContent = habilidadOculta !== null ? habilidadOculta : '';
}

function definirTipos(tiposPokemon) {
    
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