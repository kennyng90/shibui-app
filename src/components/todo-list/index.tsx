import { useCallback, useEffect, useMemo, useState } from 'react';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TodoListItem, TodoListCompleted } from '@/components';
import { useEnterKey } from '@/hooks/use-enter-key';
import {
  getHistoryFromLocalStorage,
  getTodosFromLocalStorage,
  saveHistoryToLocalStorage,
  saveTodosToLocalStorage
} from '@/utils/local-storage';
import { TodoEditingProps, TodoListProps, TodoProps } from '@/types/todo';

export function TodoList({ todos, setTodos }: TodoListProps) {
  const [editingTodo, setEditingTodo] = useState<TodoEditingProps | null>(null);
  const [historyList, setHistoryList] = useState<TodoProps[]>([]);

  const updateTodos = (newTodos: TodoProps[]) => {
    setTodos(newTodos);
  };

  const removeTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.task_id !== id);
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos);
  };

  const handleEditClick = useCallback((id: string, task: string) => {
    setEditingTodo({
      id,
      value: task
    });
  }, []);

  const saveEditedTodo = () => {
    if (!editingTodo) return;

    const isNewTaskValid = editingTodo.value.trim().length > 2;
    const isTaskDifferent = todos.some(
      (todo) =>
        todo.task_id === editingTodo.id && todo.task !== editingTodo.value
    );

    if (!isNewTaskValid || !isTaskDifferent) return;

    const updatedTodos = todos.map((todo) =>
      todo.task_id === editingTodo.id
        ? { ...todo, task: editingTodo.value }
        : todo
    );

    updateTodos(updatedTodos);
    setEditingTodo(null);
  };

  const isEditingDisabled = useMemo(
    () =>
      !editingTodo ||
      editingTodo.value.trim().length <= 2 ||
      todos.some((todo) => todo.task.trim() === editingTodo.value.trim()),
    [editingTodo, todos]
  );

  const handleKeyPress = useEnterKey(saveEditedTodo, isEditingDisabled);

  const moveTodoToHistory = (id: string) => {
    const completedTodo = todos.find((todo) => todo.task_id === id);
    const activeTodos = todos.filter((todo) => todo.task_id !== id);

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
      <>
        <ul className="grid">
          {todos.map((todo, index) => (
            <TodoListItem
              key={todo.task_id}
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
        </ul>
        {historyList.length > 0 ? (
          <TodoListCompleted
            saveHistoryToLocalStorage={setHistoryList}
            setHistoryList={setHistoryList}
            historyList={historyList}
          />
        ) : null}
      </>
    </>
  );
}
