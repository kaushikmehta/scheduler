import React from "react"
import classnames from "classnames"
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types';


export default function InterviewerList({interviewers, onChange, value}) {

  const parsedInterviewers = [];
  for (const interviewerId in interviewers){
    parsedInterviewers.push((
      <InterviewerListItem
        key={interviewers[interviewerId].id}
        id={interviewers[interviewerId].id}
        name={interviewers[interviewerId].name}
        avatar={interviewers[interviewerId].avatar}
        setInterviewer={onChange}
        selected = {value === interviewers[interviewerId].id}
        /> 
    ))
  }
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}

// Validates props
InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};