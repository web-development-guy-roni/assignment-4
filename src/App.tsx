import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { RequireAuth } from './components/RequireAuth'
import { CreatePostPage } from './pages/CreatePostPage'
import { LoginPage } from './pages/LoginPage'
import { PostDetailsPage } from './pages/PostDetailsPage'
import { PostsPage } from './pages/PostsPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterPage } from './pages/RegisterPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <RequireAuth>
            <PostsPage />
          </RequireAuth>
        }
        />
        <Route path="/posts/:id" element={
          <RequireAuth>
            <PostDetailsPage />
          </RequireAuth>
        }
        />
        <Route
          path="/posts/new"
          element={
            <RequireAuth>
              <CreatePostPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

