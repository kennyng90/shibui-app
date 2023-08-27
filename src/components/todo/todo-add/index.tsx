import { TodoAddProps } from '@/types/todo';

export const TodoAdd = ({
  addTodo,
  handleChange,
  handleKeyPress,
  isDisabled,
  name
}: TodoAddProps) => {
  return (
    <div className="mt-28 flex border-b-2  border-black">
      <input
        className="w-full py-2 text-5xl focus:outline-none"
        type="text"
        placeholder="Legg til noe..."
        autoFocus
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={name}
      />
      <button
        disabled={isDisabled}
        onClick={addTodo}
        className={`${
          isDisabled ? 'text-gray-400' : 'text-black hover:text-gray-500'
        } whitespace-nowrap text-3xl`}
      >
        Add +
      </button>
    </div>
  );
};

export default TodoAdd;
