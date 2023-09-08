import { Button, Card, CardActions, CardContent, CardMedia, Typography, styled } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  "&:hover":{
    backgroundColor: '#eee',
    cursor: 'pointer'
  }
}))

const PokemonCard:FC<IPokemonListItem> = ({id, image, name, url, art, sprite}) => {
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/287/287221.png'

  return (
    <StyledCard>
      <img
        style={{ height: 200, backgroundSize: 'contain', objectFit: 'contain', objectPosition: 'center'}}
        src={defaultImage}
        srcSet={`${image} 1x, ${art} 2x, ${defaultImage} 3x, ${defaultImage} 4x`}
        title={name}
        alt={'12'}
        width='100%'
      />
      <CardContent>
        <Typography variant="h5" align='center' textTransform='capitalize'>
          {name}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Сохранить</Button>
        <Button size="small">Читать</Button>
      </CardActions> */}
    </StyledCard>
  )
}

export default PokemonCard