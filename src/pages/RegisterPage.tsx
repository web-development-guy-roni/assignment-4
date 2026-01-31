import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { ErrorAlert } from '../components/ErrorAlert'
import { useAuth } from '../context/AuthContext'
import { login, register } from '../services/authService'
import { getErrorMessage } from '../utils/getErrorMessage'

const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(3, 'Password must be at least 6 characters'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '' },
  })

  return (
    <div className="container-fluid" style={{ maxWidth: 560 }}>
      <h2 className="mb-3">Register</h2>

      {error ? <ErrorAlert message={error} /> : null}

      <form
        className="card card-body"
        onSubmit={form.handleSubmit(async (values) => {
          setSubmitting(true)
          setError(null)
          try {
            await register({
              username: values.username,
              email: values.email,
              password: values.password,
            })
            const loginResult = await login({
              email: values.email,
              password: values.password,
            })
            auth.setAuth(loginResult)
            navigate('/')
          } catch (err) {
            setError(getErrorMessage(err))
          } finally {
            setSubmitting(false)
          }
        })}
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" {...form.register('username')} />
          {form.formState.errors.username?.message ? (
            <div className="text-danger mt-1">{form.formState.errors.username.message}</div>
          ) : null}
        </div>

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
            Create Account
          </Button>
        </div>
      </form>

      <div className="mt-3 text-muted">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
