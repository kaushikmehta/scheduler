import React from "react";
import "./DayListItem.scss"
import classnames from "classnames"


export default function DayListItem(props) {

  const { name, spots, state, setState } = props;

  const formatSpots = (spots) => {
    let spotsRemaining = "";

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
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": spots === 0 }
  );

  return (
    <li className={buttonClass} onClick={() => setState({ ...state, day:name })}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}