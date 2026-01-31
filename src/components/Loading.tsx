export function Loading(props: { text?: string }) {
  return <div className="text-muted">{props.text ?? 'Loading...'}</div>
}

