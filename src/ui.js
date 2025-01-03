import { obtenerListaDePokemons, obtenerPokemonPorNombre, obtenerPokemonPorId } from "./api/pokeApi.js";

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
            $buscadorPokemons.appendChild(option);    
        })
}

$buscadorPokemons.onchange = async ()=>
    {
        const pokemonABuscar = $buscadorPokemons.value.toLowerCase()
        if(pokemonABuscar !== 'Buscar')
            {
                const pokemon = await obtenerPokemonPorNombre(pokemonABuscar);
                pokemon.id !== 1 ? $botonAnterior.removeAttribute('disabled') : '';
                pokemon.id >= 1025 ? $botonSiguiente.setAttribute('disabled', true) : $botonSiguiente.removeAttribute('disabled');
                
                definirId(pokemon.id);
                definirNombre(pokemon.name);
                cambiarImagenPokemon(pokemon.sprites);
                definirTipos(pokemon.types);
                definirHabilidades(pokemon.abilities);
            }
    };

$botonSiguiente.onclick = async () =>
{
    let idActual;
    $idPokemon.textContent !== '???' ? idActual = Number($idPokemon.textContent) : idActual = 0;
    
    const pokemon = await obtenerPokemonPorId(idActual+1);
    pokemon.id !== 1 ? $botonAnterior.removeAttribute('disabled') : '';
    pokemon.id  >= 1025 ? $botonSiguiente.setAttribute('disabled', true) : $botonSiguiente.removeAttribute('disabled');

    definirId(pokemon.id);
    definirNombre(pokemon.name);
    cambiarImagenPokemon(pokemon.sprites);
    definirTipos(pokemon.types);
    definirHabilidades(pokemon.abilities);

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
            const pokemon = await obtenerPokemonPorId(idActual-1);
            definirId(pokemon.id);
            definirNombre(pokemon.name);
            cambiarImagenPokemon(pokemon.sprites);
            definirTipos(pokemon.types);
            definirHabilidades(pokemon.abilities);

        }
};


function cambiarImagenPokemon(spritePokemon) 
{
    $imagenPokemon.setAttribute('src', spritePokemon['front_default']);
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

function definirHabilidades(habilidadesPokemonJson) {
    
    const habilidadesPokemon = habilidadesPokemonJson;
    let listaHabilidades = [];
    let habilidadOculta;
    
    habilidadesPokemon.forEach(abilities => {
        if (abilities.is_hidden) 
            {
                habilidadOculta = abilities['ability']['name'];
            }
        else 
            {
                listaHabilidades.push(abilities['ability']['name']);
            }
    });

    $habilidadPokemon.textContent = listaHabilidades.length > 1 ? `${listaHabilidades[0]} / ${listaHabilidades[1]}` : listaHabilidades[0];
    $habilidadOcultaPokemon.textContent = habilidadOculta !== undefined ? habilidadOculta : '';
}

function definirTipos(tiposPokemonJson) {

    const tiposPokemon = tiposPokemonJson;
    let listaTipos = [];

    tiposPokemon.forEach(type => {
        listaTipos.push(type['type']['name']);
    });

    if (listaTipos.length > 1) 
        {
            $tipo1Pokemon.textContent = listaTipos[0];
            $iconoTipo1.setAttribute('src', `/icons/${listaTipos[0]}.svg`);
            $tipo2Pokemon.textContent = '/ ' + listaTipos[1];
            $iconoTipo2.removeAttribute('hidden');
            $iconoTipo2.setAttribute('src', `/icons/${listaTipos[1]}.svg`);
        }

    else 
        {
            $tipo1Pokemon.textContent = listaTipos[0];
            $iconoTipo1.setAttribute('src', `/icons/${listaTipos[0]}.svg`);
            $tipo2Pokemon.textContent = '';
            $iconoTipo2.setAttribute('hidden', true);
        }
}