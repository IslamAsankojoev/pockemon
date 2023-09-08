import { PockemonService } from '@/api/pockemon.service'
import Layout from '@/components/Layout'
import { Avatar, Badge, Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import Image from 'next/image'
import HeightIcon from '@mui/icons-material/Height'
import ScaleIcon from '@mui/icons-material/Scale'
import { getImageUrl } from '@/utils/getImageUrl'

const PokemonId = () => {
  const router = useRouter()

  const { data: pokemon, isLoading } = useQuery(
    ['pokemon', router.query.id],
    () => PockemonService.findById(Number(router.query.id)),
    {
      enabled: !!router.query.id,
    },
  )

  useEffect(() => {
    console.log(router)
  }, [router])

  return (
    <Layout>
      {pokemon ? (
        <Grid container sx={{ background: '#f5f5f5', p: 5, borderRadius: 2 }}>
          <Grid item xs={12} sm={5} sx={{ position: 'relative' }}>
            <img
              src={getImageUrl(pokemon?.id).svg}
              srcSet={`${getImageUrl(pokemon?.id).svg} 1x, ${getImageUrl(pokemon?.id).art} 2x, ${getImageUrl(pokemon?.id).sprite} 3x,`}
              alt={pokemon.name}
              width={400}
              height={400}
              style={{
                backgroundImage: 'url(/pokemon-bg.png)',
                backgroundSize:'cover',
                borderRadius: '10px'
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Chip
                sx={{
                  borderRadius: 1.5,
                  background: 'black',
                  color: 'white',
                }}
                label={
                  <Stack direction="row" spacing={2}>
                    <span>Рост {pokemon.height}</span>
                    <span>Вес {pokemon.weight}</span>
                  </Stack>
                }
              />
            </Stack>
            <Box>
                <Typography ml={2}>Спрайты</Typography>
                <Box borderRadius={2} overflow="hidden">
                  <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
                  <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/>
                  <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/>
                  <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/>
                </Box>
              </Box>
          </Grid>
          <Grid item xs={12} sm={7} sx={{ background: '#eee', p: 3, borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h5" textTransform="capitalize">
                {pokemon.name}
              </Typography>
              <Chip
                sx={{ background: '#80AC3A', color: 'white' }}
                label={pokemon.base_experience}
              />
              <Typography>опыта за победу</Typography>
            </Stack>
            <br />
            <Stack direction="column" spacing={2}>
              <Typography ml={2}>Статы</Typography>
              <Box borderRadius={2} overflow="hidden">
                {pokemon.stats.map((item, index) => (
                  <Typography
                    key={item.base_stat + item.stat.name}
                    textTransform="capitalize"
                    sx={{
                      background: index % 2 === 0 ? '#e0e0e0' : '#c4c4c4',
                      padding: 1,
                    }}
                  >
                    {item.stat.name}: {item.base_stat}
                  </Typography>
                ))}
              </Box>
              <Typography ml={2}>Тип</Typography>
              <Box borderRadius={2} overflow="hidden">
                {pokemon.types.map((item, index) => (
                  <Typography
                    key={item.slot + item.type.name}
                    textTransform="capitalize"
                    sx={{
                      background: index % 2 === 0 ? '#e0e0e0' : '#c4c4c4',
                      padding: 1,
                    }}
                  >
                    {item.type.name}
                  </Typography>
                ))}
              </Box>
              
            </Stack>
          </Grid>
        </Grid>
      ) : null}
    </Layout>
  )
}

export default PokemonId
