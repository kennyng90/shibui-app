import { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TodoItem from '@/components/todo/todo-item';
import TodoHistoryList from '@/components/todo/todo-history-list';
import useEnterKey from '@/hooks/use-enter-key';
import { handleDragEnd, StrictModeDroppable } from '@/utils/todo';
import {
  getHistoryFromLocalStorage,
  getTodosFromLocalStorage,
  saveHistoryToLocalStorage,
  saveTodosToLocalStorage
} from '@/utils/local-storage';
import { TodoEditingProps, TodoListProps, TodoProps } from '@/types/todo';

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  const [editingTodo, setEditingTodo] = useState<TodoEditingProps | null>(null);
  const [historyList, setHistoryList] = useState<TodoProps[]>([]);

  const updateTodos = (newTodos: TodoProps[]) => {
    setTodos(newTodos);
  };

  const removeTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos);
  };

  const handleEditClick = useCallback((id: string, name: string) => {
    setEditingTodo({
      id,
      value: name
    });
  }, []);

  const saveEditedTodo = () => {
    if (!editingTodo) return;

    const isNewNameValid = editingTodo.value.trim().length > 2;
    const isNameDifferent = todos.some(
      (todo) => todo.id === editingTodo.id && todo.name !== editingTodo.value
    );

    if (!isNewNameValid || !isNameDifferent) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodo.id ? { ...todo, name: editingTodo.value } : todo
    );

    updateTodos(updatedTodos);
    setEditingTodo(null);
  };

  const isEditingDisabled = useMemo(
    () =>
      !editingTodo ||
      editingTodo.value.trim().length <= 2 ||
      todos.some((todo) => todo.name.trim() === editingTodo.value.trim()),
    [editingTodo, todos]
  );

  const handleKeyPress = useEnterKey(saveEditedTodo, isEditingDisabled);

  const handleDrag = (result: DropResult) => {
    handleDragEnd(result, todos, historyList, setTodos, setHistoryList);
  };

  const moveTodoToHistory = (id: string) => {
    const completedTodo = todos.find((todo) => todo.id === id);
    const activeTodos = todos.filter((todo) => todo.id !== id);

    if (completedTodo) {
      setHistoryList((prevHistoryList) => [...prevHistoryList, completedTodo]);
      updateTodos(activeTodos);
    }
  };

  useEffect(() => {
    const loadedTodos = getTodosFromLocalStorage();
    const loadedHistory = getHistoryFromLocalStorage();

    if (loadedTodos.length > 0) {
      setTodos(loadedTodos);
    }

    if (loadedHistory.length > 0) {
      setHistoryList(loadedHistory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
    saveHistoryToLocalStorage(historyList);
  }, [todos, historyList]);

  return (
    <>
      <DragDropContext onDragEnd={handleDrag}>
        <StrictModeDroppable droppableId="todos">
          {(provided) => (
            <>
              <ul
                className="grid"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    editingTodo={editingTodo}
                    setEditingTodo={setEditingTodo}
                    removeTodo={removeTodo}
                    handleEditClick={handleEditClick}
                    handleKeyPress={handleKeyPress}
                    saveEditedTodo={saveEditedTodo}
                    isDisabled={isEditingDisabled}
                    toggleDone={moveTodoToHistory}
                  />
                ))}
                {provided.placeholder}
              </ul>
              {historyList.length > 0 ? (
                <TodoHistoryList
                  saveHistoryToLocalStorage={setHistoryList}
                  setHistoryList={setHistoryList}
                  historyList={historyList}
                />
              ) : null}
            </>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </>
  );
};

export default TodoList;
