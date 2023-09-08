import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { NavLinks } from './contsants'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Link href="/">
      <Image src="/pokemonLogo.png" alt="logo" width={150} height={55} />
      </Link>
      <Divider />
      <List>
        {NavLinks.map(({ name, path }) => (
          <ListItem key={name + path} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      {/* <CssBaseline /> */}
      <AppBar component="nav" enableColorOnDark sx={{ background: '#37393C' }}>
        <Container>
          <Toolbar>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
              <Box>
                <Link href="/">
                  <Image src="/pokemonLogo.png" alt="logo" width={150} height={55} />
                </Link>
              </Box>

              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {NavLinks.map(({ name, path }) => (
                  <Button key={name + path} sx={{ color: '#fff' }}>
                    {name}
                  </Button>
                ))}
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  )
}

export default Header
