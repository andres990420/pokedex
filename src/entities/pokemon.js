class Pokemon 
{
  constructor(pokemon) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.types = pokemon.types.map(type => type.type.name);
    this.abilities = pokemon.abilities.map(ability => !ability.is_hidden ? ability.ability.name : null);
    this.sprite = pokemon.sprites.front_default;
    this.hiddenAbility = pokemon.abilities.find(ability => ability.is_hidden).ability.name;
  }
};

export default Pokemon;