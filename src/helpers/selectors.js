
// Returns an array of appointments for one day
// based on the values on the state
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(oneDay => oneDay.name === day);

  if (filteredDay && filteredDay.appointments) {
    const appointmentsArray = filteredDay.appointments;
    return appointmentsArray.map(appointmentNumber => state.appointments[appointmentNumber]
    )
  }
  return [];
}

// formats one interview to include additional details of interviewer based on id received
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

// Looks through the state to find interviewer id for that day
// and includes their additional details (avatar, name and id)
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