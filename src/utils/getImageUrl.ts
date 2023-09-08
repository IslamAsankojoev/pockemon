export const getImageUrl = (id: number | string) => {
  return {
    svg:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    art:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  }
}