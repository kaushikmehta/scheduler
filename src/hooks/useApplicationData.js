import { useReducer, useEffect } from "react";
import axios from 'axios'

//NOTETOKAUSH: Move reducer to separate file
export default function useApplicationData() {
  const SET_DAY = "SET_DAY"
  const SET_INTERVIEW = "SET_INTERVIEW"
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
  const SET_SPOTS = "SET_SPOTS"

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          ...action.value
        }
      case SET_SPOTS:
        return {
          ...state,
          days: action.days
        }
      case SET_INTERVIEW:
        const id = action.id;
        const interview = action.interview;
        const newState = {
          ...state,
          appointments: {
            ...state.appointments,
            [id]: {
              ...state.appointments[id],
              interview
            }
          }
        }
        return newState
      default:
        return state
    }
  }

  const setDay = (day) => dispatch(
    {
      type: SET_DAY,
      day
    }
  );

  const [state, dispatch] = useReducer(reducer, {
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
      console.log("ERR", error);
    });
  }, []);


  function bookInterview(id, interview) {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        })
      })
      .then(() => {
        return axios.get("http://localhost:8001/api/days")
          .then((response) => {
            dispatch({
              type: SET_SPOTS,
              days: response.data
            })
          }).catch((error) => {
            console.log("ERR", error);
          });
      })
  }

  function cancelInterview(id) {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        })
      })
      .then(() => {
        return axios.get("http://localhost:8001/api/days")
          .then((response) => {
            dispatch({
              type: SET_SPOTS,
              days: response.data
            })
          }).catch((error) => {
            console.log("ERR", error);
          });
      })
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

