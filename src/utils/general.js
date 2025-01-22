export function obtenerHabilidadOculta(habilidadesPokemon)
{
  const habilidadOculta = habilidadesPokemon.find(ability => ability.is_hidden)
  if(habilidadOculta)
    {
      return habilidadOculta.ability.name
    }
}