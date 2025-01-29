import { obtenerHabilidadOculta, obtenerDescripcion, obtenerTipos } from "../utils/general.js";

class Pokemon 
{
  constructor(pokemon, specie) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.types = obtenerTipos(pokemon.types);
    this.abilities = pokemon.abilities.map(ability => !ability.is_hidden ? ability.ability.name : undefined);
    this.sprite = pokemon.sprites.front_default;
    this.hiddenAbility = obtenerHabilidadOculta(pokemon.abilities);
    this.description = obtenerDescripcion(specie);
  }
};

export default Pokemon;