import { TodoProps } from "@/types/todo";

const LOCAL_STORAGE_KEY = 'todos';
const HISTORY_LOCAL_STORAGE_KEY = 'historyList';

export const saveTodosToLocalStorage = (todos: TodoProps[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

export const getTodosFromLocalStorage = (): TodoProps[] => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
        return JSON.parse(storedTodos);
    }
    return [];
};

export const saveHistoryToLocalStorage = (historyList: TodoProps[]) => {
    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(historyList));
};

export const getHistoryFromLocalStorage = (): TodoProps[] => {
    const storedHistory = localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
};