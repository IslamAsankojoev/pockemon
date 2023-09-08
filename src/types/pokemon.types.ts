interface IPokemonPopulated {
  pokemon: {
    name: string
    url: string
  }
}

interface IPokemon {
  id: number
  weight: number
  height: number
  name: string
  base_experience: number
  order: number
  forms: {
    name: string
    url: string
  }[]
  sprites: {
    front_default: string
    back_default: string
    front_shiny: string
    back_shiny: string
    other:{
      dream_world:{
        front_default: string
      }
    }
  }
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}

interface IPokemonListItem {
  name: string
  url: string
  image: string
  id: number
  art: string
  sprite: string
}

interface IPokemonServer {
  name: string
  number: number
  image: string
  weight: number
  height: number
  baseExp: number
  description: string
  inMyPokemons: boolean
}