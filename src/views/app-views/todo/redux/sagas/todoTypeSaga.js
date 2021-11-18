import { TODO_TYPE_LOAD_SUCCESS } from '../types/TodoOptionTypes';

import {
  getTodoType,
  todoTypeError,
} from '../action/TodoTypeAction';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchData } from '../todoTypesApi';

export function* getTodoTypesList() {
  yield takeEvery(TODO_TYPE_LOAD_SUCCESS, function* () {
    try {
      const data = yield call(fetchData);
      yield put(getTodoType(data.data));
    } catch (err) {
      yield put(todoTypeError(err));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getTodoTypesList)]);
}
