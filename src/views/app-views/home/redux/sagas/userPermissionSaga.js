import { put, all, fork, call, takeEvery } from "redux-saga/effects";

import {USER_PERMISSION_LOAD_BY_ONE_SUCCESS} from "../types/userPermissionTypes";
import {fetchOneUserPermission} from "../userPermissionApi";
import {getUserPermissionError,getUserPermissionLineData} from "../actions/userPermissionAction";


export function* getUserPermissionDataByOne() {
    yield takeEvery(USER_PERMISSION_LOAD_BY_ONE_SUCCESS, function* (payload) {
        try {
            const data = yield call(fetchOneUserPermission, payload.id);
            yield put(getUserPermissionLineData(data.data.data));
        } catch (err) {
            yield put(getUserPermissionError(err));
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getUserPermissionDataByOne),
    ]);
}
