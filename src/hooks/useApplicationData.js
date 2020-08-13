import { useReducer, useEffect } from "react";
import axios from 'axios'

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
} from "reducers/application";

export default function useApplicationData() {
  // Sets initial state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // calls reducer to set day in state when user clicks on that day
  // called from DayListItem
  const setDay = (day) => dispatch(
    {
      type: SET_DAY,
      day
    }
  );

  // Makes calls to API to update initial state
  useEffect(() => {

    const socket = new WebSocket("ws://localhost:8001");

    socket.onopen = function () {
      socket.send("ping");
    }

    socket.onmessage = function (event) {
      const messageObject = JSON.parse(event.data)

      if (messageObject.type === "SET_INTERVIEW") {
        const id = messageObject.id;
        const messageInterview = messageObject.interview;

        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: messageInterview
        })

        return axios.get("http://localhost:8001/api/days")
          .then((response) => {
            dispatch({
              type: SET_SPOTS,
              days: response.data
            })
          }).catch((error) => {
            console.log("Error getting data from API for updating spots on WebSocket message", error);
          });
      }

    }

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
      console.log("Error getting initial state data from", error);
    });
  }, []);

  // Make a PUT call to API to book an  Interview
  // Makes a GET call to get the number of spots remaining for the day
  // Additional GET call added to stay in sync with DB
  // as opposed to updating state locally
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
            console.log("Error trying to Book Interview", error);
          });
      })
  }

  // Make a PUT call to API to delete an  Interview
  // Makes a GET call to get the number of spots remaining for the day
  // Additional GET call added to stay in sync with DB
  // as opposed to updating state locally
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
            console.log("Error trying to Cancel Interview", error);
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

