import React from 'react'

export const TaskNav = props => (
  <h4 className="bg-primary text-white text-center p-4">
    { props.username }&apos;s Task App ({ props.taskItems.filter(task => !task.done).length } task to do)
  </h4>
)