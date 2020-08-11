export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(oneDay => oneDay.name === day);

  if (filteredDay && filteredDay.appointments) {
    const appointmentsArray = filteredDay.appointments;
    return appointmentsArray.map(appointmentNumber => state.appointments[appointmentNumber]
    )
  }
  return [];
}

// NOTE TO KAUSH: update based on func. prog. princ.
export function getInterview(state, interview) {
  if (interview) {

    let resultObj = {
      "student": interview.student,
      "interviewer": {}
    };

    const interviewerObject = state.interviewers[interview.interviewer]
    interviewerObject ?
      resultObj = { ...resultObj, interviewer: state.interviewers[interview.interviewer] }
      : resultObj = null;
    return resultObj;
  } else {
    return null
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(oneDay => oneDay.name === day);
  let interviewersArray = [];
  let results = [];

  if (filteredDay && filteredDay.interviewers) {
    interviewersArray = filteredDay.interviewers;
    results = interviewersArray.map(interviewerNumber => state.interviewers[interviewerNumber]
    )
  }

  return results
}


// const state = {
//   "day": "Monday",
//   "days": [{
//       "id": 1,
//       "name": "Monday",
//       "appointments": [1, 2, 3, 4, 5],
//       "interviewers": [2, 3, 5, 9, 10],
//       "spots": 1
//   }, {
//       "id": 2,
//       "name": "Tuesday",
//       "appointments": [6, 7, 8, 9, 10],
//       "interviewers": [1, 3, 5, 8, 10],
//       "spots": 4
//   }, {
//       "id": 3,
//       "name": "Wednesday",
//       "appointments": [11, 12, 13, 14, 15],
//       "interviewers": [1, 2, 5, 6, 10],
//       "spots": 2
//   }, {
//       "id": 4,
//       "name": "Thursday",
//       "appointments": [16, 17, 18, 19, 20],
//       "interviewers": [1, 2, 3, 7, 10],
//       "spots": 4
//   }, {
//       "id": 5,
//       "name": "Friday",
//       "appointments": [21, 22, 23, 24, 25],
//       "interviewers": [1, 4, 7, 8, 9],
//       "spots": 4
//   }],
//   "appointments": {
//       "1": {
//           "id": 1,
//           "time": "12pm",
//           "interview": null
//       },
//       "2": {
//           "id": 2,
//           "time": "1pm",
//           "interview": {
//               "student": "Archie Cohen",
//               "interviewer": 2
//           }
//       },
//       "3": {
//           "id": 3,
//           "time": "2pm",
//           "interview": {
//               "student": "Chad Takahashi",
//               "interviewer": 2
//           }
//       },
//       "4": {
//           "id": 4,
//           "time": "3pm",
//           "interview": {
//               "student": "Jamal Jordan",
//               "interviewer": 3
//           }
//       },
//       "5": {
//           "id": 5,
//           "time": "4pm",
//           "interview": {
//               "student": "Leopold Silvers",
//               "interviewer": 10
//           }
//       },
//       "6": {
//           "id": 6,
//           "time": "12pm",
//           "interview": null
//       },
//       "7": {
//           "id": 7,
//           "time": "1pm",
//           "interview": null
//       },
//       "8": {
//           "id": 8,
//           "time": "2pm",
//           "interview": null
//       },
//       "9": {
//           "id": 9,
//           "time": "3pm",
//           "interview": null
//       },
//       "10": {
//           "id": 10,
//           "time": "4pm",
//           "interview": {
//               "student": "Liam Martinez",
//               "interviewer": 3
//           }
//       },
//       "11": {
//           "id": 11,
//           "time": "12pm",
//           "interview": null
//       },
//       "12": {
//           "id": 12,
//           "time": "1pm",
//           "interview": null
//       },
//       "13": {
//           "id": 13,
//           "time": "2pm",
//           "interview": {
//               "student": "Lydia Miller-Jones",
//               "interviewer": 1
//           }
//       },
//       "14": {
//           "id": 14,
//           "time": "3pm",
//           "interview": {
//               "student": "Maria Boucher",
//               "interviewer": 2
//           }
//       },
//       "15": {
//           "id": 15,
//           "time": "4pm",
//           "interview": {
//               "student": "Michael Chan-Montoya",
//               "interviewer": 10
//           }
//       },
//       "16": {
//           "id": 16,
//           "time": "12pm",
//           "interview": null
//       },
//       "17": {
//           "id": 17,
//           "time": "1pm",
//           "interview": null
//       },
//       "18": {
//           "id": 18,
//           "time": "2pm",
//           "interview": {
//               "student": "Richard Wong",
//               "interviewer": 7
//           }
//       },
//       "19": {
//           "id": 19,
//           "time": "3pm",
//           "interview": null
//       },
//       "20": {
//           "id": 20,
//           "time": "4pm",
//           "interview": null
//       },
//       "21": {
//           "id": 21,
//           "time": "12pm",
//           "interview": null
//       },
//       "22": {
//           "id": 22,
//           "time": "1pm",
//           "interview": null
//       },
//       "23": {
//           "id": 23,
//           "time": "2pm",
//           "interview": {
//               "student": "Yuko Smith",
//               "interviewer": 1
//           }
//       },
//       "24": {
//           "id": 24,
//           "time": "3pm",
//           "interview": null
//       },
//       "25": {
//           "id": 25,
//           "time": "4pm",
//           "interview": null
//       }
//   },
//   "interviewers": {
//       "1": {
//           "id": 1,
//           "name": "Sylvia Palmer",
//           "avatar": "https://i.imgur.com/LpaY82x.png"
//       },
//       "2": {
//           "id": 2,
//           "name": "Tori Malcolm",
//           "avatar": "https://i.imgur.com/Nmx0Qxo.png"
//       }
//   }
// }
// const interview = {student: "Jamal Jordan", interviewer: 3}