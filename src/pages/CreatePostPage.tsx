import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/Button'
import { ErrorAlert } from '../components/ErrorAlert'
import { createPost } from '../services/postsService'
import { getErrorMessage } from '../utils/getErrorMessage'
import { useAuth } from '../context/AuthContext'

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

type CreatePostFormValues = {
  title: string
  content: string
}

export function CreatePostPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', content: '' },
  })

  return (
    <div className="container-fluid">
      <h2 className="mb-3">Create Post</h2>

      {error ? <ErrorAlert message={error} /> : null}

      <form
        className="card card-body"
        onSubmit={form.handleSubmit(async (values) => {
          setSubmitting(true)
          setError(null)
          try {
            await createPost({ title: values.title, content: values.content, sender: user?.id ?? '' })
            navigate('/')
          } catch (err) {
            setError(getErrorMessage(err))
          } finally {
            setSubmitting(false)
          }
        })}
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" {...form.register('title')} />
          {form.formState.errors.title?.message ? (
            <div className="text-danger mt-1">{form.formState.errors.title.message}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" rows={5} {...form.register('content')} />
          {form.formState.errors.content?.message ? (
            <div className="text-danger mt-1">{form.formState.errors.content.message}</div>
          ) : null}
        </div>

        <div className="d-flex justify-content-end">
          <Button type="submit" isLoading={submitting}>
            Publish
          </Button>
        </div>
      </form>
    </div>
  )
}

