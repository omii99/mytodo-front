import {
  TODO_LIST_LOADDATA,
  ADD_TODO,
  DELETE_TODO,
  SET_CURRENT,
  UPDATE_TODO,
  TODO_LIST_LOADDATA_ALL, GET_KANBAN_TODO_SUCCESS, UPDATE_TODO_STAGE,TODO_FILTER_LIST,TODO_FILTER_LIST_SUCCESS
} from '../types/todoTypes';
import {
  getInflencer,
  setLoading,
  todoError,
  addTodoSuccess,
  deleteTodoSuccess,
  setCurrentSuccess,
  updateTodoSuccess,
  getTodoDataAll,
  loaddata, getKanbanTodoData, updateTodoStageSuccess, getFilteredData,
} from '../action/todoAction';

import { put, all, fork, call, takeEvery } from 'redux-saga/effects';
import {
  fetchData,
  createData,
  deleteData,
  updateData,
  fetchDataAll,
  fetchTODOTodos,
  fetchRESEARCHTodos,
  fetchINPROGRESSTodos,
  fetchREVIEWTodos,
  fetchCOMPLETEDTodos, 
  // fetch5MTodos,
  updateStageData,
  fetchFilteredData
} from '../api';


// import {
//   getKanbanLeadData,
//   leadError,
//   leadloaddata,
//   updateLeadSuccess
// } from "../../../lead/redux/actions/leadListAction";

export function* getTodoList() {
  yield takeEvery(TODO_LIST_LOADDATA, function* (payload) {
    try {
      setLoading();
    
      const data = yield call(fetchData, payload.page);
      console.log(data,"data sage list")
      yield put(getInflencer(data.data, data.data.total));
    } catch (err) {
      yield put(todoError(err));
    }
  });
}
export function* getFilteredTodoList() {
  yield takeEvery(TODO_FILTER_LIST_SUCCESS, function* (payload) {
    try {
      setLoading();
      const data = yield call(fetchFilteredData, payload.page, payload.category, payload.todoType, payload.todoName);
      yield put(getFilteredData(data.data));
      console.log(data.data)
    } catch (err) {
      yield put(todoError(err));
    }
  });
}
export function* getTodoListDataAll() {
  yield takeEvery(TODO_LIST_LOADDATA_ALL, function* () {
    try {
      const data = yield call(fetchDataAll);
  
      yield put(getInflencer(data));
    } catch (err) {
      yield put(todoError(err));
    }
  });
}
export function* createTodo() {
  yield takeEvery(ADD_TODO, function* (payload) {
    try {
      const data = payload.data;
      // data.status = 'active';
      yield call(createData, data);
      yield put(addTodoSuccess());
      yield put(loaddata(1));
    } catch (err) {
      console.log(err);
      yield put(todoError(err));
    }
  });
}
export function* removeTodo() {
  yield takeEvery(DELETE_TODO, function* (payload) {
    console.log(payload,"deleee")
    try {
      const projectId = payload.projectId;
      yield call(deleteData, projectId);
      yield put(deleteTodoSuccess());
      yield put(loaddata(1));
    } catch (err) {
      console.log(err, 'Error remove');
      yield put(todoError(err));
    }
  });
}

export function* updateTodoStageData() {
  yield takeEvery(UPDATE_TODO_STAGE, function* (payload) {
    console.log(payload)
    try {
      const data = payload.data;
      yield call(updateStageData, data);
      yield put(updateTodoStageSuccess());
      yield put(loaddata(1));
    } catch (err) {
      // yield put(leadError(err));
    }
  });
}


export function* loadTodoKanbanData() {
  yield takeEvery(GET_KANBAN_TODO_SUCCESS, function* () {
    try {
      const [stage1,stage2,stage3,stage4,stage5,stage6] = yield all([
        call(fetchTODOTodos),
        call(fetchRESEARCHTodos),
        call(fetchINPROGRESSTodos),
        call(fetchREVIEWTodos),
        call(fetchCOMPLETEDTodos),
        // call(fetch5MTodos)
      ])

      const columns = {
        "Todo": stage1,
        "Research":stage2,
        "Inprogress": stage3,
        "Review": stage4,
        "Completed":stage5,
        // "5M Purchases":stage6,
      }
      yield put(getKanbanTodoData(columns));
    } catch (err) {
      // yield put(leadError(err));
    }
  });
}

export function* setCurrentTodoList() {
  yield takeEvery(SET_CURRENT, function* (payload) {
    try {
      yield put(setCurrentSuccess(payload.data));
    } catch (err) {
      yield put(todoError(err));
    }
  });
}

export function* updateInfluncerData() {
  yield takeEvery(UPDATE_TODO, function* (payload) {
    try {
      const data = payload.data;
      // data.status = 'active';
      yield call(updateData, data);
      yield put(updateTodoSuccess());
      yield put(loaddata(1));
    } catch (err) {
      yield put(todoError(err));
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(getTodoList),
    fork(createTodo),
    fork(removeTodo),
    fork(setCurrentTodoList),
    fork(updateInfluncerData),
    fork(getTodoListDataAll),
    fork(loadTodoKanbanData),
    fork(updateTodoStageData),
    fork(getFilteredTodoList)
  ]);
}
