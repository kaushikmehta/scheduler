import { useState, useEffect } from "react";
import axios from 'axios'

export default function useApplicationData() {

  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }
      ));
    }).catch((error) => {
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data);
    });
  }, [])

  function bookInterview(id, interview, changeSpots) {
    let newDays = [...state.days];

    console.log(changeSpots)

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        if (changeSpots) {
          ///// NEW CODE
          const today = state.days.find(day => day.appointments.includes(id));
          const dayToChangeSpotsFor = newDays.find(newDay => newDay.id === today.id);
          dayToChangeSpotsFor.spots = dayToChangeSpotsFor.spots - 1;
        //////////
        }
        setState(prev => ({ ...prev, appointments: appointments, days: newDays }));
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`,
        appointment
      )
      .then((response) => {
        const changeInterview = (prev) => {
          return { ...prev.appointments, [id]: { ...prev.appointments[id], interview: null } }
        }
        // use .find to find the day that has this appointment id,
        const today = state.days.find(day => day.appointments.includes(id));
        const newDays = [...state.days];

        // get the number of spots for that day using day.spots
        // increment
        const dayToChangeSpotsFor = newDays.find(newDay => newDay.id === today.id);
        dayToChangeSpotsFor.spots = dayToChangeSpotsFor.spots + 1;

        setState(prev => ({ ...prev, appointments: changeInterview(prev), days: newDays }));
      })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

