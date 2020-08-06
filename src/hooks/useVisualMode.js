import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      const sliced = history.slice(0, history.length - 1)
      setHistory([...sliced, newMode])
    } else {
      setHistory([...history, newMode])
    }
    setMode(newMode)
  }


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