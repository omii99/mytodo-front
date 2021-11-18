import {
    GET_USER_PERMISSION_BY_ONE_DATA,
    USER_PERMISSION_LOAD_BY_ONE_ERROR,
    USER_PERMISSION_LOAD_BY_ONE_SUCCESS
} from "../types/userPermissionTypes";

const initialState = {
    userPermission: null,
    id:"",
    loading:false,
    error:""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PERMISSION_BY_ONE_DATA:
            return {
                ...state,
                userPermission: action.data,
                loading: false
            };
        case USER_PERMISSION_LOAD_BY_ONE_SUCCESS:
            return {
                ...state,
                id:action.data,
                loading: true
            }
        case USER_PERMISSION_LOAD_BY_ONE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.data
            }
        default:
            return state;
    }
};
