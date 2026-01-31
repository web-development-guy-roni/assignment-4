import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { AppNavbar } from './AppNavbar'
import { Sidebar } from './Sidebar'
import { useAuth } from '../context/AuthContext'

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
  const { accessToken } = useAuth()
  return (
    <Shell>
      <AppNavbar />
      <Body>
        {accessToken && <Sidebar />}
        <Content>
          <Outlet />
        </Content>
      </Body>
    </Shell>
  )
}
