import React from 'react'
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    }).catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }

  function deleteInterview(id) {
    transition(DELETING);
    props.cancelInterview(id).then(() => {
      transition(EMPTY);
    }).catch((error) => {
      console.log(error.response.status);
      console.log(error.response.data);
    });
  }



  return (
    <article className="appointment">
      <Header time={props.time} />


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
        // onClick={}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving Interview"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to Delete this Interview?"} onDelete={deleteInterview} onCancel={()=>back()} id={props.id} />}
      {mode === DELETING && <Status message={"DELETING Interview"} />}

    </article>
  )

}