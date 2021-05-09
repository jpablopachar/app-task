import { useEffect, useState } from 'react';
import './App.css';
import { Control } from './components/control';
import { TaskCreate } from './components/task-create';
import { TaskNav } from './components/task-nav';
import { TaskRow } from './components/task-row';

function App() {
  const [username, setUsername] = useState('Juan');
  const [taskItems, setTaskItems] = useState([
    { name: 'Task One', done: false },
    { name: 'Task Two', done: false },
    { name: 'Task Three', done: false },
    { name: 'Task Four', done: false },
  ])
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')

    if (data !== null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUsername('Juan example')
      setTaskItems([
        { name: 'Task One example', done: false },
        { name: 'Task Two example', done: false },
        { name: 'Task Three example', done: false },
        { name: 'Task Four example', done: false },
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const toggleTask = task => setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)))
  const taskList = (doneValue) => taskItems.filter(task => task.done === doneValue).map(task => ( <TaskRow task={ task } key={ task.name } toggleTask={ toggleTask } /> ))
  const createNewTask = taskName => {
    if (!taskItems.find(task => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  return (
    <div>
      <TaskNav username={ username } taskItems={ taskItems } />
      <TaskCreate callback={ createNewTask } />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          { taskList(false) }
        </tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <Control description="Completed Tasks" isChecked={ showCompleted } callback={ checked => setShowCompleted(checked) } />
      </div>
      { showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            { taskList(true) }
          </tbody>
        </table>
      ) }
    </div>
  );
}

export default App;
