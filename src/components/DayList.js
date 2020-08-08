import React from 'react'
import DayListItem from './DayListItem'

export default function DayList(props) {
  const { days, day } = props

  const parsedDays = days.map(oneDay => (
    <DayListItem
      key={oneDay.name}
      name={oneDay.name}
      spots={oneDay.spots}
      selected={oneDay.name === day}
      setDay={props.setDay} />
  ))

  return parsedDays;
}