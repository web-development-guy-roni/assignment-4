import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BsHouseDoor } from 'react-icons/bs'

const SidebarWrap = styled.aside`
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #dee2e6;
`

const SideNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.25rem;
`

const SideLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #212529;

  &:hover {
    background: #f1f3f5;
  }

  &.active {
    background: #e7f1ff;
    color: #0d6efd;
    font-weight: 600;
  }
`

export function Sidebar() {
  return (
    <SidebarWrap>
      <SideNav>
        <SideLink to="/" end>
          <BsHouseDoor />
          Posts
        </SideLink>
      </SideNav>
    </SidebarWrap>
  )
}

