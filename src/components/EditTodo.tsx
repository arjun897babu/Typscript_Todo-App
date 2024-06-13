import { FormEvent, useState } from "react"
import { Todo } from "../interface";

interface EditTodoProps {
  updateTodo: (task: string, id: number) => void,
  task: Todo
}

function EditTodo({ updateTodo, task }: EditTodoProps): JSX.Element {

  const [value, setValue] = useState<string>(task.task)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateTodo(value, task.id)
  }

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input type="text" className="todo-input" placeholder={value} value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit" className="todo-btn"  >Update Task</button>
    </form>
  )
}


export default EditTodo