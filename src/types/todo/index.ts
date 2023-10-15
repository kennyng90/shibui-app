export type TodoAddItemProps = {
  task: string;
  isDisabled: boolean;
  addTodo: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TodoEditingProps = {
  id: string;
  value: string;
};

export type TodoListCompletedProps = {
  historyList: TodoProps[];
  setHistoryList: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  saveHistoryToLocalStorage: (historyList: TodoProps[]) => void;
};

export type TodoListItemEditProps = {
  editingTodo: TodoEditingProps;
  setEditingTodo: React.Dispatch<React.SetStateAction<TodoEditingProps | null>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  saveTodo: () => void;
  todo: TodoProps;
  isDisabled: boolean;
};

export type TodoListItemProps = {
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
};

export type TodoListProps = {
  todos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
};

export type TodoProps = {
  user_id: string | undefined;
  task: string;
  task_id: string;
  is_complete: boolean;
};
