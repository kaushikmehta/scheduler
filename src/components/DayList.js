import React from 'react'
import DayListItem from './DayListItem'

export default function DayList(props) {
  const { days, day, state, setState } = props

  const parsedDays = days.map(oneDay => (
    <DayListItem
      key={oneDay.name}
      name={oneDay.name}
      spots={oneDay.spots}
      selected={oneDay.name === day}
      state={state}
      setState={setState} />
  ))

  return parsedDays;
}