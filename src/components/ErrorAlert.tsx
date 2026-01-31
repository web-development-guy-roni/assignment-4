// Guy-Rozenbaum-214424814-Roni-Taktook-213207640
export function ErrorAlert(props: { message: string }) {
  return (
    <div className="alert alert-danger" role="alert">
      {props.message}
    </div>
  )
}

