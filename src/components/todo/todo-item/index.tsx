import TodoItemEdit from '@/components/todo/todo-item-edit';
import { TodoItemProps } from '@/types/todo';
import { Draggable } from 'react-beautiful-dnd';

const TodoItem = ({
  todo,
  editingTodo,
  handleEditClick,
  handleKeyPress,
  index,
  removeTodo,
  saveEditedTodo,
  setEditingTodo,
  isDisabled,
  toggleDone
}: TodoItemProps) => {
  return (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex items-center justify-between pb-5 text-3xl focus-visible:outline-none"
        >
          {editingTodo && editingTodo.id === todo.id ? (
            <TodoItemEdit
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
                  id={todo.id}
                  type="checkbox"
                  className="sr-only"
                  tabIndex={-1}
                  checked={todo.isDone}
                  onChange={() => toggleDone(todo.id)}
                />
                <label htmlFor={todo.id}>
                  <button onClick={() => toggleDone(todo.id)}>
                    {todo.name}
                  </button>
                </label>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEditClick(todo.id, todo.name)}>
                  edit
                </button>
                <button onClick={() => removeTodo(todo.id)}>del</button>
              </div>
            </>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
