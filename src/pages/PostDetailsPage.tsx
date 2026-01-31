import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorAlert } from '../components/ErrorAlert'
import { ListGroup, ListGroupItem } from '../components/ListGroup'
import { Loading } from '../components/Loading'
import { createComment, getComments } from '../services/commentsService'
import { getPost } from '../services/postsService'
import type { ApiComment, ApiPost } from '../types/api'
import { getErrorMessage } from '../utils/getErrorMessage'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'

const commentSchema = z.object({
  content: z.string().min(1, 'Comment is required'),
})

type CommentFormValues = z.infer<typeof commentSchema>

export function PostDetailsPage() {
  const { id } = useParams()
  const { accessToken, user } = useAuth()

  const [post, setPost] = useState<ApiPost | null>(null)
  const [comments, setComments] = useState<ApiComment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' },
  })

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([getPost(id), getComments(id)])
      .then(([p, c]) => {
        if (cancelled) return
        setPost(p)
        setComments(c)
      })
      .catch((err) => {
        if (cancelled) return
        setError(getErrorMessage(err))
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (!id) return <ErrorAlert message="Missing post id." />

  return (
    <div className="container-fluid">
      {loading ? <Loading /> : null}
      {error ? <ErrorAlert message={error} /> : null}

      {!loading && !error && post ? (
        <>
          <div className="mb-4">
            <h2 className="mb-2">{post.title}</h2>
            <p className="mb-0">{post.content}</p>
          </div>

          <div className="mb-3">
            <h4 className="mb-2">Comments</h4>

            <ListGroup className="mb-3">
              {comments.map((c) => (
                <ListGroupItem key={String(c.id)}>
                  <div className="d-flex justify-content-between gap-3">
                    <div className="flex-grow-1">
                      <div>{c.content}</div>
                    </div>
                  </div>
                </ListGroupItem>
              ))}
              {comments.length === 0 ? <ListGroupItem className="text-muted">No comments yet.</ListGroupItem> : null}
            </ListGroup>

            {accessToken ? (
              <form
                onSubmit={form.handleSubmit(async (values) => {
                  setSubmitting(true)
                  setSubmitError(null)
                  try {
                    const created = await createComment({ postId: id, content: values.content, owner: user?.id ?? '' })
                    setComments((prev) => [created, ...prev])
                    form.reset({ content: '' })
                  } catch (err) {
                    setSubmitError(getErrorMessage(err))
                  } finally {
                    setSubmitting(false)
                  }
                })}
                className="card card-body"
              >
                <div className="mb-2">
                  <label className="form-label">Add a comment</label>
                  <textarea className="form-control" rows={3} {...form.register('content')} />
                  {form.formState.errors.content?.message ? (
                    <div className="text-danger mt-1">{form.formState.errors.content.message}</div>
                  ) : null}
                </div>

                {submitError ? <ErrorAlert message={submitError} /> : null}

                <div className="d-flex justify-content-end">
                  <Button type="submit" isLoading={submitting}>
                    Post Comment
                  </Button>
                </div>
              </form>
            ) : (
              <div className="alert alert-info">Login to add a comment.</div>
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

