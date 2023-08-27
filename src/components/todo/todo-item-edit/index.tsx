import { TodoItemEditProps } from '@/types/todo';

const TodoItemEdit = ({
  editingTodo,
  setEditingTodo,
  handleKeyPress,
  saveTodo,
  isDisabled
}: TodoItemEditProps) => {
  const cancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <>
      <input
        type="text"
        className="border-b pb-4 outline-none"
        autoFocus
        size={Math.max(editingTodo.value.length, 1)}
        value={editingTodo.value}
        onKeyDown={handleKeyPress}
        onChange={(e) =>
          setEditingTodo({ ...editingTodo, value: e.target.value })
        }
      />
      <div className="flex gap-5">
        <button
          onClick={saveTodo}
          disabled={isDisabled}
          className={isDisabled ? 'text-gray-500' : 'text-black'}
        >
          Save
        </button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    </>
  );
};

export default TodoItemEdit;
