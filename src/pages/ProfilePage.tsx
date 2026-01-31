// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/Button'
import { ErrorAlert } from '../components/ErrorAlert'
import { useAuth } from '../context/AuthContext'
import { updateUser } from '../services/usersService'
import { getErrorMessage } from '../utils/getErrorMessage'

const profileSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
})

type ProfileFormValues = {
  username: string
  email: string
}

export function ProfilePage() {
  const { accessToken, user: authUser, setAuth } = useAuth()
  const userId = authUser?.id

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: '', email: '' },
  })

  useEffect(() => {
    // Prefill the profile form from the saved user data received during login.
    if (!authUser) return
    form.reset({
      username: authUser.username ?? '',
      email: authUser.email ?? '',
    })
  }, [authUser, form])

  if (!userId || !authUser) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">
          Your saved session is missing user details. Please logout and login again so the app can save the user object from{' '}
          <code>/auth/login</code>.
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid" style={{ maxWidth: 720 }}>
      <h2 className="mb-3">Profile</h2>

      <div className="card card-body mb-3">
        <div className="text-muted">Logged in as</div>
        <div>
          <strong>{authUser.username}</strong> <span className="text-muted">({authUser.email})</span>
        </div>
      </div>

      <form
        className="card card-body"
        onSubmit={form.handleSubmit(async (values) => {
          if (!accessToken) return
          setSaving(true)
          setSaveError(null)
          try {
            await updateUser({
              id: userId,
              username: values.username,
              email: values.email,
            })
            setAuth({
              accessToken: accessToken,
              user: { id: userId, username: values.username, email: values.email },
            })
          } catch (err) {
            setSaveError(getErrorMessage(err))
          } finally {
            setSaving(false)
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

        {saveError ? <ErrorAlert message={saveError} /> : null}

        <div className="d-flex justify-content-end">
          <Button type="submit" isLoading={saving}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
