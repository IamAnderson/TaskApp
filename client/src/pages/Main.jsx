import React, { useEffect } from 'react'
import styled from 'styled-components'
import Auth from '../components/Auth'
import Navbar from '../components/Navbar'
import Texts from '../subComponents/Texts'
import AccessPage from './AccessPage'
import { useSelector } from 'react-redux'

const Main = () => {
  const { user} = useSelector((state) => state.auth) 

  return (
    <Container>
      <Navbar />
      {<Auth />}
    </Container>
  )
}

export default Main

const Container = styled.div`

`