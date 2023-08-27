export interface TodoAddProps {
    name: string;
    isDisabled: boolean;
    addTodo: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface TodoEditingProps {
    id: string;
    value: string;
}

export interface TodoHistoryListProps {
    historyList: TodoProps[];
    setHistoryList: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    saveHistoryToLocalStorage: (historyList: TodoProps[]) => void;
}

export interface TodoItemEditProps {
    editingTodo: TodoEditingProps;
    setEditingTodo: React.Dispatch<React.SetStateAction<TodoEditingProps | null>>;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    saveTodo: () => void;
    todo: TodoProps;
    isDisabled: boolean;
}

export interface TodoItemProps {
    index: number;
    todo: TodoProps;
    editingTodo: TodoEditingProps | null;
    setEditingTodo: React.Dispatch<React.SetStateAction<TodoEditingProps | null>>;
    removeTodo: (id: string) => void;
    handleEditClick: (id: string, name: string) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    saveEditedTodo: () => void;
    isDisabled: boolean;
    toggleDone: (id: string) => void;
}

export interface TodoListProps {
    todos: TodoProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
}

export interface TodoProps {
    id: string;
    name: string;
    isDone: boolean;
}