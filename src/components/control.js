import React from 'react'

export const Control = props => {
  return (
    <div>
      <input
        type="checkbox"
        className="form-check-input me-2"
        checked={ props.isChecked }
        onChange={ event => props.callback(event.target.checked) }
      />
      <label htmlFor="form-check-label">Show { props.description }</label>
    </div>
  )
}