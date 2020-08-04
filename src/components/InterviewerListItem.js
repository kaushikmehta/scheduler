import React from 'react'

import './InterviewerListItem.scss'


{/* <InterviewerListItem
id={interviewer.id}
name={interviewer.name}
avatar={interviewer.avatar}
/> */}

export default function InterviewerListItem(props) {
  return (
    <li onClick={props.setInterviewer} className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
  {props.name}
    </li>
  )
}