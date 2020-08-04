import React from 'react'
import DayListItem from './DayListItem'

export default function DayList(props) {
  const { days, day, setDay } = props

  const parsedDays = days.map(oneDay => (
    <DayListItem
      name={oneDay.name}
      spots={oneDay.spots}
      selected={oneDay.name === day}
      setDay={setDay} />
  ))

  return parsedDays;
}