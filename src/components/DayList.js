import React from 'react'
import DayListItem from './DayListItem'

export default function DayList({days, day, setDay}) {
  const parsedDays = days.map(oneDay => (
    <DayListItem
      key={oneDay.name}
      name={oneDay.name}
      spots={oneDay.spots}
      selected={oneDay.name === day}
      setDay={setDay} />
  ))

  return parsedDays;
}