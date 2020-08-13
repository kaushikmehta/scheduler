import React, { useState } from 'react'

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form({interviewer, interviewers, onCancel, onSave, name}) {
  const [studentName, setStudentName] = useState(name || "");
  const [appointmentInterviewer, setAppointmentInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setStudentName("");
    setAppointmentInterviewer(null)
  }
  function cancel() {
    reset();
    onCancel();
  }

  function validate() {

    //Validates Student Name cannot be blank
    //Additionally Validates unselected interviewer
    // to avoid crashing the app
    if (studentName === "") {
      setError("Student name cannot be blank");
      return;
    } else if (!appointmentInterviewer) {
      setError("Please select an Interviewer from the list");
      return;
    }
    setError("")
    onSave(studentName, appointmentInterviewer);
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
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={interviewers} value={appointmentInterviewer} onChange={setAppointmentInterviewer} />
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