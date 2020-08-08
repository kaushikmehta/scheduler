import { useEffect, useReducer } from "react";
import axios from 'axios'

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value }
      case SET_APPLICATION_DATA:
        return { ...state, ...action.value }
      case SET_INTERVIEW: {
        return { ...state, ...action.value }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => {
    console.log(day);
    dispatch({
      type: SET_DAY,
      value: day
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      })
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

        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            ...state,
            appointments: appointments,
            days: newDays
          }
        })
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
        const changeInterview = (state) => {
          return { ...state.appointments, [id]: { ...state.appointments[id], interview: null } }
        }
        // use .find to find the day that has this appointment id,
        const today = state.days.find(day => day.appointments.includes(id));
        const newDays = [...state.days];

        // get the number of spots for that day using day.spots
        // increment
        const dayToChangeSpotsFor = newDays.find(newDay => newDay.id === today.id);
        dayToChangeSpotsFor.spots = dayToChangeSpotsFor.spots + 1;
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            ...state,
            appointments: changeInterview(state),
            days: newDays
          }
        })
      })
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

