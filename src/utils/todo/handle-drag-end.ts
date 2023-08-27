import { DropResult } from 'react-beautiful-dnd';
import { TodoProps } from '@/types/todo';
import { reorderTodos } from '@/utils/todo';

export const handleDragEnd = (
    result: DropResult,
    todos: TodoProps[],
    historyList: TodoProps[],
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>,
    setHistoryList: React.Dispatch<React.SetStateAction<TodoProps[]>>
) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === 'todos' && destination.droppableId === 'history') {
        const movedTodo = todos[source.index];
        const updatedTodos = [...todos];
        updatedTodos.splice(source.index, 1);

        const updatedHistory = [...historyList];
        updatedHistory.splice(destination.index, 0, movedTodo);

        setTodos(updatedTodos);
        setHistoryList(updatedHistory);
    } else if (source.droppableId === 'history' && destination.droppableId === 'todos') {
        const movedTodo = historyList[source.index];
        const updatedHistory = [...historyList];
        updatedHistory.splice(source.index, 1);

        const updatedTodos = [...todos];
        updatedTodos.splice(destination.index, 0, movedTodo);

        setTodos(updatedTodos);
        setHistoryList(updatedHistory);
    } else if (source.droppableId === 'todos' && destination.droppableId === 'todos') {
        const updatedTodos = reorderTodos(todos, result);
        setTodos(updatedTodos);
    }
};
