import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { endpoints } from './constants'
import { useRouter } from 'next/router'

interface FilterProps {
  filter: IResponseList<IUniversal>
  index: number
  children?: React.ReactNode
}

const Filter: FC<FilterProps> = ({ filter, index }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const filterRef = React.useRef(null)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (filterRef.current && !e.composedPath().includes(filterRef.current)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
     <List ref={filterRef} sx={{ py: 0, background: '#F5F5F5' }}>
      <ListItemButton  onClick={handleClick}>
        <ListItemText primary={endpoints[index]} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {filter?.results.map((item) => (
            <ListItemButton ref={filterRef.current} sx={{ 
              pl: 4, 
              background: router?.query?.filterName === endpoints[index] && router?.query?.filterValue === item.name ? '#C6DEB2' : '#eee', 
              "&:hover":{
                background: '#C6DEB2'
              }
            }} key={item.name} onClick={()=>{
              router.push({
                query: {
                  filterName: endpoints[index],
                  filterValue: item.name
                }
              })
            }}>
              <ListItemText primary={item.name} sx={{textTransform:'capitalize'}} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      </List>
    </>
  )
}

export default Filter
