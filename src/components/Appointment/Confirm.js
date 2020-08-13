import React from 'react'
import Button from 'components/Button'

export default function Confirm({id, message, onCancel, onDelete}) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={()=> onCancel()}>Cancel</Button>
        <Button danger onClick={()=> onDelete(id)}>Confirm</Button>
      </section>
    </main>
  )
}