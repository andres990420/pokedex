import { obtenerHabilidadOculta } from "../utils/general.js";

class Pokemon 
{
  constructor(pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.types = pokemon.types.map(type => type.type.name);
    this.abilities = pokemon.abilities.map(ability => !ability.is_hidden ? ability.ability.name : undefined);
    this.sprite = pokemon.sprites.front_default;
    this.hiddenAbility = obtenerHabilidadOculta(pokemon.abilities);
  }
};

export default Pokemon;