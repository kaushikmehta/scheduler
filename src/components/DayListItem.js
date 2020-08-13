import React from "react";
import "./DayListItem.scss"
import classnames from "classnames"
import { findAllByLabelText } from "@testing-library/react";


export default function DayListItem( { name, spots, setDay, selected }) {
  const formatSpots = (spots) => {
    let spotsRemaining = "";

    // Formats Spots for Labels on DayList
    if (spots === 1) {
      spotsRemaining = spots + " spot remaining";
    } else if (spots > 1) {
      spotsRemaining = spots + " spots remaining";
    } else {
      spotsRemaining = "no spots remaining";
    }

    return spotsRemaining;
  }

  let buttonClass = classnames(
    "day-list__item",
    { "day-list__item--selected": selected },
    { "day-list__item--full": spots === 0 }
  );

  return (
    <li data-testid="day" className={buttonClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}