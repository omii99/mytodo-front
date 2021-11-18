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
  CLEAR_CURRENT,
  TODO_ERROR,
  SET_LOADING,
  GET_TODO_LIST_ALL,
  TODO_LIST_LOADDATA_ALL,
  GET_KANBAN_TODO_LIST_DATA,
  GET_KANBAN_TODO_SUCCESS,
  GET_KANBAN_TODO_ERROR,
  TODO_FILTER_LIST,
  TODO_FILTER_LIST_SUCCESS,
} from "../types/todoTypes";


const initialState = {
  data: [],
  message: "",
  showMessage: false,
  page: 1,
  total: 0,
  loading: false,
  current: null,
  error: null,
  columns: {},
  kanbanLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO:
      console.log(action.data,"reducer data")
      return {
        ...state,
        data: action.data,
        total: action.total,
        loading: false,
      };
    case TODO_LIST_LOADDATA:
      return {
        ...state,
        page: action.page,
        loading: true,
      };
    case GET_TODO_LIST_ALL:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case GET_KANBAN_TODO_SUCCESS:
      return {
        ...state,
        kanbanLoading: true,
      };
    case GET_KANBAN_TODO_LIST_DATA:
      console.log(action.data);
      return {
        ...state,
        columns: action.data,
        kanbanLoading: false,
      };
    case GET_KANBAN_TODO_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case TODO_LIST_LOADDATA_ALL:
      return {
        ...state,
        loading: true,
      };
    case ADD_TODO:
      return {
        ...state,
        data: [action.data, ...state.data],
        loading: true,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.projectId !== action.projectId),
        loading: true,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TODO:
      console.log("influ update");
      return {
        ...state,
        // data : state.data,
        data: state.data.map((d) =>
          d.id === action.data.id ? action.data : d
        ),
        lodaing: true,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SET_CURRENT:
      console.log(action.data,"current reducer")
      return {
        ...state,
        current: action.data,
        loading: true,
      };
    case SET_CURRENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case TODO_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TODO_FILTER_LIST:
      console.log(action)
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case TODO_FILTER_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
