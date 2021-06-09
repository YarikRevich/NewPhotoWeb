import { Dispatch } from "react";
import { checkAuth, signIn, signOut, signUp } from "../api/auth";
import { deleteTokens } from "../api/storage";
import { Reducers, SentData } from "../types";

const initialState = {
    isAuthed: false,
    isChecking: false,
    isSignedUp: false,
}

type initialStateType = typeof initialState;

const authReducer = (state: initialStateType = initialState, action: Reducers.AuthenticationReducer.IAuthAction) => {
    switch (action.type) {
        case Reducers.AuthenticationReducer.CHECK_AUTH_SUCCESS:
            return { ...state, isAuthed: true }
        case Reducers.AuthenticationReducer.CHECK_AUTH_ERROR:
            return { ...state }
        case Reducers.AuthenticationReducer.SIGN_OUT_SUCCESS:
            return { ...state, isAuthed: false }
        case Reducers.AuthenticationReducer.SIGN_OUT_ERROR:
            return { ...state }
        case Reducers.AuthenticationReducer.SIGN_IN_SUCCESS:
            return { ...state, isAuthed: true }
        case Reducers.AuthenticationReducer.SIGN_IN_ERROR:
            return { ...state }
        case Reducers.AuthenticationReducer.SIGN_UP_SUCCESS:
            return { ...state, isSignedUp: true }
        case Reducers.AuthenticationReducer.SIGN_UP_ERROR:
            return { ...state }
        case Reducers.AuthenticationReducer.TURN_OFF_SIGNED_UP:
            return { ...state, isSignedUp: false }
    }
    return state
}

export const createCheckAuth = () => async (dispatch: Dispatch<Reducers.AuthenticationReducer.IAuthAction>) => {
    const ok = await checkAuth()
    if (ok) {
        dispatch(createCheckAuthSuccess())
    } else {
        dispatch(createCheckAuthError())
    }
}

const createCheckAuthSuccess = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.CHECK_AUTH_SUCCESS }
}

const createCheckAuthError = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.CHECK_AUTH_ERROR }
}

export const createLogout = () => async (dispatch: Dispatch<Reducers.AuthenticationReducer.IAuthAction>) => {
    const ok = await signOut()
    if (ok) {
        deleteTokens()
        dispatch(createLogoutSuccess())
    } else {
        dispatch(createLogoutAuthError())
    }
}

const createLogoutSuccess = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.SIGN_OUT_SUCCESS }
}

const createLogoutAuthError = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.SIGN_OUT_ERROR }
}

export const createLogin = (d: SentData.SignIn) => async (dispatch: Dispatch<Reducers.AuthenticationReducer.IAuthAction>) => {
    const ok = await signIn(d)
    if (ok) {
        dispatch(createLoginSuccess())
    } else {
        dispatch(createLoginAuthError())
    }
}

const createLoginSuccess = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.SIGN_IN_SUCCESS }
}

const createLoginAuthError = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.SIGN_IN_ERROR }
}

export const createRegistration = (d: SentData.SignUp) => async (dispatch: Dispatch<Reducers.AuthenticationReducer.IAuthAction>) => {
    const ok = await signUp(d)
    console.log(ok)
    if (ok) {
        dispatch(createRegistrationSuccess())
    } else {
        dispatch(createRegistrationError())
    }
}

const createRegistrationSuccess = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.SIGN_UP_SUCCESS }
}

const createRegistrationError = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.SIGN_UP_ERROR }
}

export const createTurnOffSignedUp = (): Reducers.AuthenticationReducer.IAuthAction => {
    return { type: Reducers.AuthenticationReducer.TURN_OFF_SIGNED_UP }
}

export default authReducer