import React from "react"
import classnames from "classnames"
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  let buttonClass = classnames(
    "interviewers__list"
    );

  const parsedInterviewers = [];
  for (const interviewerId in props.interviewers){
    parsedInterviewers.push((
      <InterviewerListItem
        key={props.interviewers[interviewerId].id}
        id={props.interviewers[interviewerId].id}
        name={props.interviewers[interviewerId].name}
        avatar={props.interviewers[interviewerId].avatar}
        setInterviewer={props.onChange}
        selected = {props.value === props.interviewers[interviewerId].id}
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