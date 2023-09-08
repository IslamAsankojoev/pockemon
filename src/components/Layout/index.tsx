import { FC } from "react"
import Header from "./Header"
import { Container } from "@mui/material"

interface LayoutProps {
  children: React.ReactNode
}

const Layout:FC<LayoutProps> = ({children}) => {
  return (
    <>
    <Header />
    <Container sx={{
      py:10
    }}>{children}</Container>
    </>
  )
}

export default Layout