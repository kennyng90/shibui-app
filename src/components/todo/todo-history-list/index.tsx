import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TodoHistoryListProps } from '@/types/todo';

const TodoHistoryList: React.FC<TodoHistoryListProps> = ({
  historyList,
  saveHistoryToLocalStorage,
  setHistoryList
}) => {
  const removeItem = (id: string) => {
    const newHistoryList = historyList.filter((todo) => todo.id !== id);
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
        <Droppable droppableId="history">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {historyList.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex w-full justify-between"
                    >
                      <span className="text-2xl text-gray-400 line-through">
                        {todo.name}
                      </span>
                      <button onClick={() => removeItem(todo.id)}>del</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      ) : null}
    </div>
  );
};

export default TodoHistoryList;
