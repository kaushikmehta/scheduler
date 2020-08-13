import React from 'react'
import classnames from 'classnames'
import './InterviewerListItem.scss'

export default function InterviewerListItem({avatar, id, name, selected, setInterviewer}) {
  const buttonClass = classnames(
    "interviewers__item",
    {"interviewers__item--selected":selected}
  )
  return (
    <li onClick={() => setInterviewer(id)} className={buttonClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}