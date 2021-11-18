
import {
    GET_USER_PERMISSION_BY_ONE_DATA,
    USER_PERMISSION_LOAD_BY_ONE_ERROR,
    USER_PERMISSION_LOAD_BY_ONE_SUCCESS
} from "../types/userPermissionTypes";

export const getUserPermissionSuccess = (id) => {
    return{
        type: USER_PERMISSION_LOAD_BY_ONE_SUCCESS,
        id
    }
}

export const getUserPermissionLineData = (data) =>{
    return{
        type: GET_USER_PERMISSION_BY_ONE_DATA,
        data
    }
}

export const getUserPermissionError = (data) =>{
    return{
        type: USER_PERMISSION_LOAD_BY_ONE_ERROR,
        data
    }
}
