import { instance } from './axios.config'

export const UniversalService = {
  findAll: async (endpoint:string = '/pokemon', params:any) => {
    const { filterValue, ...other} = params
    const response = await instance.get<IResponseList<IUniversal>>(`${endpoint}/${filterValue ? filterValue : ''}`, {
      // @ts-ignore
      other,
    })
    return response.data
  },
  findById: async (endpoint:string, id: number) => {
    const response = await instance.get<IPokemon>(endpoint + id)
    return response.data
  },
}
