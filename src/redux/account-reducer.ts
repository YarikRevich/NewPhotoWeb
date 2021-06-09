import { Dispatch } from "react";
import { getAccountInfo, getAvatar } from "../api/account";
import { Reducers } from "../types";

let initialState = {
    result: {
        firstname: "",
        secondname: "",
        storage: 0,
    },
    avatar: ""
}

type initialStateType = typeof initialState;

const accountReducer = (state: initialStateType = initialState, action: Reducers.AccountReducer.IAccountAction) => {

    switch (action.type) {
        case Reducers.AccountReducer.GET_ACCOUNT_INFO_SUCCESS:
            return { ...state, result: action.data }
        case Reducers.AccountReducer.GET_ACCOUNT_INFO_ERROR:
            return { ...state }
        case Reducers.AccountReducer.GET_AVATAR_SUCCESS:
            return { ...state, avatar: action.avatar }
        case Reducers.AccountReducer.GET_AVATAR_ERROR:
            return { ...state }
    }
    return state
}

export const createGetAccountInfo = () => async (dispatch: Dispatch<Reducers.AccountReducer.IAccountAction>) => {
    const r = await getAccountInfo()
    if (r && r.ok) {
        dispatch(createGetAccountInfoSuccess(r.data))
    } else {
        dispatch(createGetAccountInfoError())
    }
}

const createGetAccountInfoSuccess = (d: any): Reducers.AccountReducer.IAccountAction => {
    return { type: Reducers.AccountReducer.GET_ACCOUNT_INFO_SUCCESS, data: d }
}

const createGetAccountInfoError = (): Reducers.AccountReducer.IAccountAction => {
    return { type: Reducers.AccountReducer.GET_ACCOUNT_INFO_ERROR }
}

export const createGetAvatar = () => async (dispatch: Dispatch<Reducers.AccountReducer.IAccountAction>) => {
    const r = await getAvatar()
    if (r && r.ok) {
        dispatch(createGetAvatarSuccess(r.avatar))
    } else {
        dispatch(createGetAvatarError())
    }
}

const createGetAvatarSuccess = (a: string): Reducers.AccountReducer.IAccountAction => {
    return { type: Reducers.AccountReducer.GET_AVATAR_SUCCESS, avatar: a }
}

const createGetAvatarError = (): Reducers.AccountReducer.IAccountAction => {
    return { type: Reducers.AccountReducer.GET_AVATAR_ERROR }
}

export default accountReducer
