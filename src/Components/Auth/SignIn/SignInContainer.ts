import React, { Dispatch } from "react"
import { connect } from "react-redux"
import type { State } from "../../../types"
import type { SentData } from "./../../../types/index"
import { createLogin, createTurnOffSignedUp } from "./../../../redux/auth-reducer"
import SignIn from "./SignIn"

const mapStateToProps = (props: State) => {
    return {
        isAuthed: props.authentication.isAuthed,
        isSignedUp: props.authentication.isSignedUp
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        handleSubmit: (d: SentData.SignIn) => {
            dispatch(createLogin(d))
        },
        turnOffSignedUp: () => {
            dispatch(createTurnOffSignedUp())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)