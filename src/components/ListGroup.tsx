import React from 'react'

export function ListGroup(props: { children: React.ReactNode; flush?: boolean; className?: string }) {
  const { children, flush, className } = props
  return <ul className={['list-group', flush ? 'list-group-flush' : '', className].filter(Boolean).join(' ')}>{children}</ul>
}

export function ListGroupItem(props: { children: React.ReactNode; className?: string }) {
  return <li className={['list-group-item', props.className].filter(Boolean).join(' ')}>{props.children}</li>
}

