import React from "react"
import classnames from "classnames"
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types';


export default function InterviewerList({interviewers, onChange, value}) {
  let buttonClass = classnames(
    "interviewers__list"
    );

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
      <ul className={buttonClass}>{parsedInterviewers}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};