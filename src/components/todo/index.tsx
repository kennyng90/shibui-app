import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoAddItem, TodoList } from '@/components';
import { TodoProps } from '@/types/todo';
import { useEnterKey } from '@/hooks/use-enter-key';
import { supabase } from '@/lib/client';
import { isAuthenticated } from '@/utils/user';

export function Todo() {
  const [task, setTask] = useState<string>('');
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTask(value);

    const disableButton =
      value.length <= 2 ||
      todos.some((todo) => todo.task.toLowerCase() === value.toLowerCase());
    setIsDisabled(disableButton);
  };

  const addTodo = async () => {
    const supabaseUser = await supabase.auth.getUser();
    const newTodo = {
      user_id: supabaseUser
        ? ((await supabaseUser).data.user?.id as string)
        : uuidv4(),
      task_id: uuidv4(),
      task: task,
      is_complete: false
    };

    if (isAuthenticated) {
      newTodo.user_id = supabaseUser.data.user?.id as string;

      const { error } = await supabase.from('todos').insert([newTodo]).single();

      if (error) {
        console.log(error.message);
        return;
      }
    }
    setTodos([...todos, newTodo]);
    setTask('');
    setIsDisabled(true);
  };

  const handleKeyPress = useEnterKey(addTodo, isDisabled);

  return (
    <div className="grid gap-10">
      <TodoAddItem
        addTodo={addTodo}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        isDisabled={isDisabled}
        task={task}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
