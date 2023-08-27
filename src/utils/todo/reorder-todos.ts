import { DropResult } from 'react-beautiful-dnd';
import { TodoProps } from '@/types/todo';

export const reorderTodos = (
    todos: TodoProps[],
    result: DropResult
): TodoProps[] => {
    const reorderedTodos = Array.from(todos);
    const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination!.index, 0, reorderedItem);
    return reorderedTodos;
};