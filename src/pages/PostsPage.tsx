import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorAlert } from '../components/ErrorAlert'
import { ListGroup, ListGroupItem } from '../components/ListGroup'
import { Loading } from '../components/Loading'
import { getPosts } from '../services/postsService'
import type { ApiPost } from '../types/api'
import { getErrorMessage } from '../utils/getErrorMessage'

export function PostsPage() {
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getPosts()
      .then((data) => {
        if (cancelled) return
        setPosts(data)
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
  }, [])

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Posts</h2>
      </div>

      {loading ? <Loading /> : null}
      {error ? <ErrorAlert message={error} /> : null}

      {!loading && !error ? (
        <ListGroup>
          {posts.map((p) => {
            const postId = p._id ?? p.id
            return (
            <ListGroupItem key={String(postId ?? p.title)}>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div className="flex-grow-1">
                  <h5 className="mb-1">{p.title}</h5>
                  <p className="mb-1 text-muted">
                    {p.content?.slice(0, 140) ?? ''}
                    {p.content && p.content.length > 140 ? '…' : ''}
                  </p>
                  {p.user?.username ? <small className="text-secondary">by {p.user.username}</small> : null}
                </div>
                {postId !== undefined ? (
                  <Link className="btn btn-outline-primary btn-sm" to={`/posts/${postId}`}>
                    View
                  </Link>
                ) : (
                  <span className="text-muted">Missing id</span>
                )}
              </div>
            </ListGroupItem>
            )
          })}
          {posts.length === 0 ? (
            <ListGroupItem className="text-muted">No posts yet.</ListGroupItem>
          ) : null}
        </ListGroup>
      ) : null}
    </div>
  )
}

