import React from "react"
import classnames from "classnames"
import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {
  let buttonClass = classnames(
    "interviewers__list", 
    {}
    );

  const parsedInterviewers = props.interviewers.map(interviewer => (
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    onClick-={props.setInterviewer}
    selected = {props.interviewer === interviewer.id}
    /> 
  ))
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className={buttonClass}>{parsedInterviewers}</ul>
    </section>
  )
}