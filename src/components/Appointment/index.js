import React, { useEffect } from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'

export default function Appointment({id, interview, interviewers, time, cancelInterview, bookInterview}) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_INTERVIEWER = "ERROR_INTERVIEWER";
  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY ); // Ternary to decide on intial Visual Mode

  //Calls bookInterview function that triggers dispatch to reducer
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
      transition(SAVING);
      bookInterview(id, interview)
        .then(() => {
          transition(SHOW);
        }).catch((error) => {
          console.log("Error Booking Interview: ", error)
          transition(ERROR_SAVE, true)
        }) 
    }

  //Calls cancelInterview function that triggers dispatch to reducer
  function deleteInterview(id) {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      }).catch((error) => {
        transition(ERROR_DELETE, true)
      });
  }


  // Updates everytime the interview, transition or mode variables change
  // to accurately display state of appointment
  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
     }
     if (interview === null && mode === SHOW) {
      transition(EMPTY);
     }
    }, [interview, transition, mode]);

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          changeSpots={true}
        />
      )}

      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          interviewer={interview.interviewer.id}
        />
      )}

      {mode === SAVING && <Status message={"Saving Interview"} />}

      {mode === CONFIRM && <Confirm message={"Are you sure you want to Delete this Interview?"} onDelete={deleteInterview} onCancel={() => back()} id={id} />}

      {mode === DELETING && <Status message={"DELETING Interview"} />}

      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back} />}

      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={back} />}
      
      {mode === ERROR_INTERVIEWER && <Error message={"Please Select an Interviewer"} onClose={back} />}

    </article>
  )

}