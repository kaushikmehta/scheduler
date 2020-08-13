import React from "react";
import classnames from "classnames"


import "components/Button.scss";

export default function Button({confirm, danger, onClick, disabled, children}) {
   
   let buttonClass = classnames("button", {"button--confirm":confirm}, {"button--danger":danger});
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={buttonClass}
      >
         {children}
      </button>
   );
}

