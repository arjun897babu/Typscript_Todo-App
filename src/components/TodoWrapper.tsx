import { useState } from 'react'
import '../App.css'
import TodoForm from './TodoForm'
import { Todo } from '../interface'
import TodoList from './TodoList'
import EditTodo from './EditTodo'

class TodoItem implements Todo {
  constructor(
    public id: number,
    public task: string,
    public completed: boolean = false,
    public isEditing: boolean = false
  ) {

  }
}

function TodoWrapper(): JSX.Element {

  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (task: string) => {

    const trimmedTask: string = task.trim();

    if (!trimmedTask) return

    const isDuplicate: boolean = todos
      .some((item: Todo) =>
        item.task.toLowerCase().replace(/\s/g, '') === trimmedTask.toLowerCase().replace(/\s/g, '')
      );

    if (isDuplicate) {
      return;
    }

    const newTodo: Todo = new TodoItem(Date.now(), trimmedTask);
    setTodos([...todos, newTodo])

  }

  const completeTask = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleEditTodo = (id: number) => {

    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ?
        { ...todo, isEditing: !todo.isEditing } : todo
    );

    setTodos(updatedTodos);
  };

  const updateTodo = (task: string, id: number) => {

    const trimmedTask: string = task.trim();

    if (!trimmedTask) return

    const isDuplicate: boolean = todos
      .some((item: Todo) =>
        item.id !== id&&
        (item.task.toLowerCase().replace(/\s/g, '') === trimmedTask.toLowerCase().replace(/\s/g, ''))
      );

    if (isDuplicate) {
      return;
    }

    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ?
        { ...todo, task: task, isEditing: false } : todo
    );

    setTodos(updatedTodos);
  }

  const todoList = todos
    .filter((todo) => !todo.completed)
    .map((todo) =>

      (todo.isEditing) ?
        <EditTodo
          updateTodo={updateTodo}
          task={todo}
        /> :
        <TodoList
          key={todo.id}
          singleTask={todo}
          completeTask={completeTask}
          deleteTodo={deleteTodo}
          toggleEditTodo={toggleEditTodo}
        />
    )

  const completedTodos = todos
    .filter((todo) => todo.completed)
    .map((todo) =>
      <TodoList
        key={todo.id}
        singleTask={todo}
        completeTask={completeTask}
        deleteTodo={deleteTodo}
        toggleEditTodo={toggleEditTodo}
      />
    )

  return (
    <div className='TodoWrapper'>
      <h1>Focus On Your Day</h1>
      <TodoForm addTodo={addTodo} />
      {todoList}
      {completedTodos.length > 0 &&
       <div className='completedTodo'>
         <h3>completed</h3>
         {completedTodos}
       </div>
      }
    </div>
  )
}

export default TodoWrapper
