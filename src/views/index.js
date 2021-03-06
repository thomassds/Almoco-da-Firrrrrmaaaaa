import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import paths from 'constants/paths'
import Restaurants from 'views/restaurants'
import First from 'views/restaurants/first'
import Last from 'views/restaurants/last'

const menu = [
  {
    page: '',
    title: 'Todos',
  },
  {
    page: 'first',
    title: '+ Votados',
  },
  {
    page: 'last',
    title: '- Votados',
  },
]

const renderSteps = () => menu.map((step) => 
  <Step to={step.page}>
    {step.title}
  </Step>
)

const View = () => (
  <Container>
    <Header>Almoço da Firrrrrrrmaaaa!</Header>
    <Steps>
        {renderSteps()}
      </Steps>
    <Switch>
      <Route
        exact
        path={paths.restaurants.root}
        render={ () => <Restaurants /> }
      />
      <Route
        exact
        path={paths.restaurants.first}
        render={ () => <First /> }
      />
      <Route
        exact
        path={paths.restaurants.last}
        render={ () => <Last /> }
      />
    </Switch>
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 1024px;
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  
`

const Header = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-top: 75px;
  color: #fff;
`

const Steps = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 30vw;
  margin-top: 75px;

  
    
`

const Step = styled(NavLink)`
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  font-size: 22px;
  
  &:active{
    color: #00FF00;
  }
  &:hover{
      opacity: 0.8;
      color: #00FF00;
  }
  &:first-child:hover{
      opacity: 0.8;
      color: #fff;
  }
  &:last-child:hover{
      color: #ff0000;
  }

  
`

export default View