import {
  TODO_LIST_LOADDATA,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  GET_TODO,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  SET_CURRENT,
  SET_CURRENT_SUCCESS,
  GET_KANBAN_TODO_SUCCESS,
  GET_KANBAN_TODO_ERROR,
  GET_KANBAN_TODO_LIST_DATA,
  TODO_ERROR,
  SET_LOADING,
  TODO_LIST_LOADDATA_ALL,
  GET_TODO_LIST_ALL,
  UPDATE_TODO_STAGE,
  UPDATE_TODO_STAGE_SUCCESS,
  TODO_FILTER_LIST,
  TODO_FILTER_LIST_SUCCESS,
  TODO_FILTER_LIST_ERROR,
} from "../types/todoTypes";


//requestTodo data

export const loadTodoDataAll = () => {
  return {
    type: TODO_LIST_LOADDATA_ALL,
  };
};

export const getTodoDataAll = (data) => {
  return {
    type: GET_TODO_LIST_ALL,
    data,
  };
};
export const loaddata = (page) => {
  return {
    type: TODO_LIST_LOADDATA,
    page,
  };
};

export const loadFilteredData = (
  page,
  category,
  todoType,
  todoName
) => {
  return {
    type: TODO_FILTER_LIST_SUCCESS,
    page,
    category,
    todoType,
    todoName,
  };
};

export const getFilteredData = (data) => {
  return {
    type: TODO_FILTER_LIST,
    data,
  };
};

//getData
export const getInflencer = (data, total) => {
  console.log(data,"action list")
  return{
  type: GET_TODO,
  data,
  total,
}};

export const addTodo = (data) => {
  return {
    type: ADD_TODO,
    data,
  };
};
export const addTodoSuccess = () => {
  return {
    type: ADD_TODO_SUCCESS,
  };
};

export const deleteTodo = (projectId) => {
  return {
    type: DELETE_TODO,
    projectId,
  };
};

export const getKanbanTodoLoading = () => {
  return {
    type: GET_KANBAN_TODO_SUCCESS,
  };
};

export const getKanbanTodoData = (data) => {
  return {
    type: GET_KANBAN_TODO_LIST_DATA,
    data,
  };
};

export const updateTodoStage = (data) => {
  console.log(data);
  return {
    type: UPDATE_TODO_STAGE,
    data,
  };
};
export const updateTodoStageSuccess = () => {
  return {
    type: UPDATE_TODO_STAGE_SUCCESS,
  };
};

export const kanbanDataError = (err) => ({
  type: GET_KANBAN_TODO_ERROR,
  payload: err.message,
});

export const deleteTodoSuccess = () => {
  return {
    type: DELETE_TODO_SUCCESS,
  };
};

export const updateTodo = (data) => {
  return {
    type: UPDATE_TODO,
    data,
  };
};
export const updateTodoSuccess = () => {
  return {
    type: UPDATE_TODO_SUCCESS,
  };
};

export const setCurrent = (data) => {
  return {
    type: SET_CURRENT,
    data,
  };
};

export const setCurrentSuccess = () => {
  return {
    type: SET_CURRENT_SUCCESS,
  };
};

export const todoError = (err) => ({
  type: TODO_ERROR,
  payload: err.message,
});

export const setLoading = () => ({
  type: SET_LOADING,
});
