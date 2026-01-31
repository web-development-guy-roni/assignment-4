import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { AppNavbar } from './AppNavbar'

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`

const Content = styled.main`
  flex: 1;
  padding: 1rem;
`

export function MainLayout() {
  return (
    <Shell>
      <AppNavbar />
      <Body>
        <Content>
          <Outlet />
        </Content>
      </Body>
    </Shell>
  )
}
