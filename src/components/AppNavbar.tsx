import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BsBoxArrowInRight, BsBoxArrowRight, BsPersonPlus } from 'react-icons/bs'
import { useAuth } from '../context/AuthContext'

export function AppNavbar() {
  const { accessToken, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Social App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          <ul className="navbar-nav ms-auto">
            {accessToken ? (
              <>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                  >
                    <BsBoxArrowRight className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <NavLink className="btn btn-outline-light" to="/login">
                    <BsBoxArrowInRight className="me-2" />
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-light" to="/register">
                    <BsPersonPlus className="me-2" />
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

