import { all } from "redux-saga/effects";
import Auth from "./Auth";


import TodoSaga from "../../views/app-views/todo/redux/sagas/todoSagas";

export default function* rootSaga(getState) {
  yield all([
    Auth(),
   
   
    TodoSaga(),
   
  ]);
}
