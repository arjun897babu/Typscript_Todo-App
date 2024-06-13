import { ChangeEvent, FormEvent, useState } from "react";

interface TodoFormProps {
  addTodo: (task: string) => void
}

function TodoForm({ addTodo }: TodoFormProps): JSX.Element {
  const [task, setTask] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addTodo(task);
    setTask('')
  }

  return (
    <>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="What is the task today?"
          value={task}
          onChange={handleChange}
        />
        <button type="submit" className="todo-btn">Add Task</button>
      </form>
    </>
  )
}


export default TodoForm;