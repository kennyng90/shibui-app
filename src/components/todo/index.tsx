import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoAdd, TodoList } from '@/components';
import { TodoProps } from '@/types/todo';
import useEnterKey from '@/hooks/use-enter-key';

const Todo = () => {
  const [name, setName] = useState<string>('');
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setName(value);

    const disableButton =
      value.length <= 2 ||
      todos.some((todo) => todo.name.toLowerCase() === value.toLowerCase());
    setIsDisabled(disableButton);
  };

  const addTodo = () => {
    const newTodo = {
      id: uuidv4(),
      name: name,
      isDone: false
    };
    setTodos([...todos, newTodo]);
    setName('');
    setIsDisabled(true);
  };

  const handleKeyPress = useEnterKey(addTodo, isDisabled);

  return (
    <div className="grid gap-10">
      <TodoAdd
        addTodo={addTodo}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        isDisabled={isDisabled}
        name={name}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Todo;
