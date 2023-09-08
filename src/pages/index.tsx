import { PockemonService } from '@/api/pockemon.service'
import { UniversalService } from '@/api/unversal.service'
import _ from 'lodash'
import Layout from '@/components/Layout'
import PokemonCard from '@/components/Pokemon/PokemonCard'
import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQueries, useQuery } from 'react-query'
import List from '@mui/material/List'
import Filter from '@/components/Filter'
import { endpoints } from '@/components/Filter/constants'
import { getPokemonId } from '@/utils/getPokemonId'
import { getImageUrl } from '@/utils/getImageUrl'

export default function Home() {
  const router = useRouter()
  const [sortName, setSortName] = useState<'desc' | 'asc'>('asc')

  const [pokemonRes, setPokemonRes] = useState<IPokemonListItem[]>()

  const { data } = useQuery(['pokemons', router.query], () => {
    return UniversalService.findAll(router.query.filterName as string, {
      filterValue: router.query.filterValue as string,
    })
  }, {
    select: (data:any) => {

      if(data?.pokemon){
        return data?.pokemon?.map((item:IPokemonPopulated) => {
          return {
            id: getPokemonId(item.pokemon.url),
            name: item.pokemon.name,
            image: getImageUrl(getPokemonId(item.pokemon.url)).svg,
            art: getImageUrl(getPokemonId(item.pokemon.url)).art,
            sprite: getImageUrl(getPokemonId(item.pokemon.url)).sprite,
          } as unknown as IPokemonListItem
        })
      } 
      if(data?.pokemon_species){
        return data?.pokemon_species.map((item:IPokemonListItem) => {
          return {
            id: getPokemonId(item.url),
            name: item.name,
            image: getImageUrl(getPokemonId(item.url)).svg,
            art: getImageUrl(getPokemonId(item.url)).art,
            sprite: getImageUrl(getPokemonId(item.url)).sprite,
          } as unknown as IPokemonListItem
        })
      }
      if(data?.results) {
        return data?.results.map((item:IPokemonListItem) => {
          return {
            id: getPokemonId(item.url),
            name: item.name,
            image: getImageUrl(getPokemonId(item.url)).svg,
            art: getImageUrl(getPokemonId(item.url)).art,
            sprite: getImageUrl(getPokemonId(item.url)).sprite,
          } as unknown as IPokemonListItem
        })
      }
    }
  })

  const results = useQueries(
    endpoints.map((endpoint) => {
      return {
        queryKey: [endpoint],
        queryFn: () => UniversalService.findAll(`/${endpoint}`, {
          limit: 20
        }),
      }
    }),
  )

  const handleSort = () => {
    setSortName(sortName === 'asc' ? 'desc' : 'asc')
  }

  useEffect(() => {
    setPokemonRes(prev=>_.orderBy(prev, ['name'], [sortName]))
  }, [sortName])

  useEffect(() => {
    setPokemonRes(data)
  }, [data])


  return (
    <Layout>
     <Stack direction='row' alignItems='center' justifyContent='space-between'>
     <Typography variant="h5" my={2}>
        Pokemons
      </Typography>
      
     <Stack direction='row' alignItems='center' spacing={2}>
     <Typography variant="subtitle2" my={2}>
        сортировка
      </Typography>
     <Button onClick={handleSort}>по имени</Button>
     </Stack>
     </Stack>
      <>
        <Grid container spacing={2} justifyContent='space-around'>
          {results ? (
            <Grid item xs={12} sm={3}>
              {results?.map(({ data }, index) => (
                  <Filter key={index} filter={data as any} index={index} />
              ))}
            </Grid>
          ) : null}
           <Grid item xs={12} sm={8}>
          {pokemonRes ? (
           
              <Grid container spacing={2}>
                {pokemonRes?.map((pokemon:IPokemonListItem) => (
                  <Grid item xs={6} sm={6} md={4} lg={4} key={pokemon.id}>
                    <Link href={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
                      <PokemonCard {...pokemon} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
          ) : null}
          </Grid>
        </Grid>
      </>
    </Layout>
  )
}
