import React from 'react'
import classnames from 'classnames'
import './InterviewerListItem.scss'


{/* <InterviewerListItem
id={interviewer.id}
name={interviewer.name}
avatar={interviewer.avatar}
/> */}

export default function InterviewerListItem(props) {
  const buttonClass = classnames(
    "interviewers__item",
    {"interviewers__item--selected":props.selected}
  )
  return (
    <li onClick={() => props.setInterviewer(props.id)} className={buttonClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}