import React from 'react';
import { TodoListCompletedProps } from '@/types/todo';

export function TodoListCompleted({
  historyList,
  saveHistoryToLocalStorage,
  setHistoryList
}: TodoListCompletedProps) {
  const removeItem = (id: string) => {
    const newHistoryList = historyList.filter((todo) => todo.task_id !== id);
    setHistoryList(newHistoryList);
    saveHistoryToLocalStorage(newHistoryList);
  };

  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="grid gap-4">
      <div className="flex justify-between border-b border-black">
        <h2 className="text-2xl">Completed</h2>
        <button onClick={toggleVisibility}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      {isVisible ? (
        <ul>
          {historyList.map((todo, index) => (
            <li key={index} className="flex w-full justify-between">
              <span className="text-2xl text-gray-400 line-through">
                {todo.task}
              </span>
              <button onClick={() => removeItem(todo.task_id)}>del</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
