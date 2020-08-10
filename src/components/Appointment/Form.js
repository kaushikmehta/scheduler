import React, { useState } from 'react'

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null)
  }
  function cancel() {
    reset();
    props.onCancel();
  }
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(name, interviewer);
    setError("")
    // props.onSave(name, interviewer, props.changeSpots); // NOTETOKAUSH: Find another way to changespots (using dispatch)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={e => setName(e.target.value)}
            data-testid="student-name-input"
          /*
            This must be a controlled component
          */
          />
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={e => cancel()}>Cancel</Button>
          <Button confirm onClick={e => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}