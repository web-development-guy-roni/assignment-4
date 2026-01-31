import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { Button } from '../components/Button'
import { ErrorAlert } from '../components/ErrorAlert'
import { useAuth } from '../context/AuthContext'
import { login } from '../services/authService'
import { getErrorMessage } from '../utils/getErrorMessage'

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(3, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const from = (location.state as any)?.from as string | undefined

  return (
    <div className="container-fluid" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Login</h2>

      {error ? <ErrorAlert message={error} /> : null}

      <form
        className="card card-body"
        onSubmit={form.handleSubmit(async (values) => {
          setSubmitting(true)
          setError(null)
          try {
            const result = await login(values)
            auth.setAuth(result)
            navigate(from ?? '/', { replace: true })
          } catch (err) {
            if (isAxiosError(err) && (err.response?.status === 400 || err.response?.status === 401)) {
              setError('Invalid username or password')
            } else {
              setError(getErrorMessage(err))
            }
          } finally {
            setSubmitting(false)
          }
        })}
      >
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" {...form.register('email')} />
          {form.formState.errors.email?.message ? (
            <div className="text-danger mt-1">{form.formState.errors.email.message}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input className="form-control" type="password" {...form.register('password')} />
          {form.formState.errors.password?.message ? (
            <div className="text-danger mt-1">{form.formState.errors.password.message}</div>
          ) : null}
        </div>

        <div className="d-flex justify-content-end">
          <Button type="submit" isLoading={submitting}>
            Login
          </Button>
        </div>
      </form>

      <div className="mt-3 text-muted">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  )
}
