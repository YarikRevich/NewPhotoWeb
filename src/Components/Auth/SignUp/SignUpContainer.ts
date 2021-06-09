import { Dispatch } from "react"
import { connect } from "react-redux"
import { createRegistration } from "../../../redux/auth-reducer"
import type { SentData, State } from "../../../types"
import SignUp from "./SignUp"

const mapStateToProps = (props: State) => {
    return {
        isSignedUp: props.authentication.isSignedUp
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        handleSubmit: (d: SentData.SignUp) => {
            dispatch(createRegistration(d))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)