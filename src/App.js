import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    document.body.classList.add('bg-light')
    if (localStorage.getItem('tasks')!== null) {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    }
  }, [])

  const Task = (props) => {
    return (
        <div className="list-group-item">
          <div className="d-flex align-items-center justify-content-between">
            <div>{props.name}</div>
            <button onClick={() => delete_task(props.index)} className="btn fw-bold text-danger btn-sm">Remove</button>
          </div>
        </div>
    )
  }

  const submit_form_add_task = (e) => {
    e.preventDefault()
    const task_name = e.target.task_name.value
    localStorage.setItem('tasks', JSON.stringify([...tasks, { 'name': task_name }]))
    setTasks(JSON.parse(localStorage.getItem('tasks')))
    e.target.reset()
  }

  const delete_task = (task_index) => {
    const new_list = tasks.filter((task, index) => {
      return index !== task_index
    })
    localStorage.setItem('tasks', JSON.stringify(new_list))
    setTasks(new_list)
  }

  const empty_tasks = () => {
    localStorage.clear()
    setTasks([])
  }

  return (
      <>
        <div className="container mt-5">
          <div className="card bg-transparent border-0 mx-auto" style={{maxWidth:"500px"}}>
            <div className="card-header bg-transparent border-0">
              <h1 className="text-center">Todo App</h1>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => submit_form_add_task(e)}>
                <input placeholder="Type Task Name" autoComplete="off" className="form-control mb-3" type="text" name="task_name" />
                <div className="d-grid mb-3">
                  <button className="btn btn-primary fw-bold" type="submit">Add Task</button>
                </div>
              </form>
              {tasks.length > 0 ?
                  <p className="text-end">
                    <button onClick={empty_tasks} className="btn btn-light border text-danger fw-bold btn-sm">Empty Tasks</button>
                  </p>:
              <p className="text-muted">No Tasks</p>}
            </div>
            <div className="list-group">
              {tasks.map((task, index) => {
                return (
                    <Task key={index} index={index} name={task.name} />
                )
              })}
            </div>
          </div>
        </div>

      </>
  )
}

