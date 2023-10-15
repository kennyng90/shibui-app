import { TodoListItemEdit } from '@/components';
import { TodoListItemProps } from '@/types/todo';

export function TodoListItem({
  todo,
  editingTodo,
  handleEditClick,
  handleKeyPress,
  removeTodo,
  saveEditedTodo,
  setEditingTodo,
  isDisabled,
  toggleDone
}: TodoListItemProps) {
  return (
    <li className="flex items-center justify-between pb-5 text-3xl focus-visible:outline-none">
      {editingTodo && editingTodo.id === todo.task_id ? (
        <TodoListItemEdit
          todo={todo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          handleKeyPress={handleKeyPress}
          saveTodo={saveEditedTodo}
          isDisabled={isDisabled}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            <input
              id={todo.task_id}
              type="checkbox"
              className="sr-only"
              tabIndex={-1}
              checked={todo.is_complete}
              onChange={() => toggleDone(todo.task_id)}
            />
            <label htmlFor={todo.task_id}>
              <button onClick={() => toggleDone(todo.task_id)}>
                {todo.task}
              </button>
            </label>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleEditClick(todo.task_id, todo.task)}>
              edit
            </button>
            <button onClick={() => removeTodo(todo.task_id)}>del</button>
          </div>
        </>
      )}
    </li>
  );
}
