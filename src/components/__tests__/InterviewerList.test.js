import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";
import InterviewerList from "components/InterviewerList";


const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

afterEach(cleanup);

describe("Interviewer List", () => {
  it("renders without crashing", () => {
    render(<InterviewerList interviewers={state.interviewers} value={2} onChange={() => console.log("changing interviewer")} />);
  });

  // it("should throw warning when trying to send a string to interviewer value", () => {
  //   render(<InterviewerList interviewers={state.interviewers} value={"two"} onChange={"setInterviewer"} />)
  // })
})