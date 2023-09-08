import { getImageUrl } from '@/utils/getImageUrl'
import { instance } from './axios.config'
import { getPokemonId } from '@/utils/getPokemonId'
const endpoint = '/pokemon/'

export const PockemonService = {
  findAll: async (params: { limit?: number; offset?: number }) => {
    const response = await instance.get<IResponseList<IPokemonListItem>>(endpoint, {
      params,
    })
    return {
      ...response.data,
      results: response.data.results.map((item) => ({
        ...item,
        id: Number(getPokemonId(item.url)),
        image: getImageUrl(getPokemonId(item.url)).svg,
        art: getImageUrl(getPokemonId(item.url)).art,
        sprite: getImageUrl(getPokemonId(item.url)).sprite,
      })),
    }
  },
  findById: async (id: number) => {
    const response = await instance.get<IPokemon>(endpoint + id)
    return response.data
  },
}
