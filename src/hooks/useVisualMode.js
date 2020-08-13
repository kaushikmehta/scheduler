// This is used to set the Visual Mode of an Appointment
// based on user interactions

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Adds a mode to the History
  // Replaces latest mode on Errors
  function transition(newMode, replace) {
    if (replace) {
      const sliced = history.slice(0, history.length - 1)
      setHistory([...sliced, newMode])
    } else {
      setHistory([...history, newMode])
    }
    setMode(newMode)
  }

  // Goes back to the previous mode in History
  function back() {
    const len = history.length
    if (len > 1) {
      const sliced = history.slice(0, history.length - 1)
      setHistory(sliced)
      setMode(history[len - 2])
    }
  }

  return { mode, transition, back };
}