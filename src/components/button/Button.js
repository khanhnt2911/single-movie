import React from "react";

const Button = (props) => {
  const { onClick, children, className, type = "submit", bgColor = 'primary', wfull } = props
  let bgClassName = 'bg-primary'

  switch (bgColor) {
    case 'primary':
      bgClassName = 'bg-primary'
      break;
    case 'secondary':
      bgClassName = 'bg-secondary'
      break;
    default:
      break;
  }
  return (
    <button type={type} className={`py-3 px-6 rounded-lg capitalize ${bgClassName} ${wfull ? 'w-full' : ''} mt-auto ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button