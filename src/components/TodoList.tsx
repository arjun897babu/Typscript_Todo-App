import { Todo } from "../interface";


interface TodoListProps {
  singleTask: Todo,
  completeTask: (id: number) => void,
  deleteTodo: (id: number) => void,
  toggleEditTodo: (id: number) => void,
}


function TodoList({ singleTask, completeTask, deleteTodo, toggleEditTodo }: TodoListProps): JSX.Element {

  return (
    <div className={`Todo ${singleTask.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={singleTask.completed} onChange={() => completeTask(singleTask.id)} />
      <p style={{
        margin:'0 15px  0 15px ',
        maxWidth: '290px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>{singleTask.task}</p>
      <div>
        {!singleTask.completed &&
          <i
            className="fa fa-pencil edit-icon"
            onClick={() => toggleEditTodo(singleTask.id)} >
          </i>}
        <i
          className="fa fa-trash delete-icon"
          onClick={() => deleteTodo(singleTask.id)} >
        </i>
      </div>
    </div>
  )
}
export default TodoList;