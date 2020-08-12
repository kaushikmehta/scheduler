const SET_DAY = "SET_DAY"
const SET_INTERVIEW = "SET_INTERVIEW"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_SPOTS = "SET_SPOTS"

export default function reducer(state, action) {
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

export  { 
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
}