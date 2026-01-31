// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
export function Loading(props: { text?: string }) {
  return <div className="text-muted">{props.text ?? 'Loading...'}</div>
}
