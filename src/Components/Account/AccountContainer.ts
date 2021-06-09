import React, { Dispatch } from "react"
import { Account } from "./Account"
import { compose } from "redux"
import { connect } from "react-redux"
import { withAuth } from "./../../hoc/auth"
import type { State } from "./../../types"
import { createGetAccountInfo } from "../../redux/account-reducer"
import { createLogout } from "../../redux/auth-reducer"

const mapStateToProps = (state: State) => {
    return ({
        authentication: state.authentication,
        accountPage: state.accountPage
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        handleLogout: () => {
            dispatch(createLogout())
        },
        getAccountInfo: () => {
            dispatch(createGetAccountInfo())
        },
        handleSubmit: (ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>) => {
            const login = ref1.current?.value;
            const password = ref2.current?.value;

        },
        handleForm: (ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>, ref3: React.RefObject<HTMLInputElement>, ref4: React.RefObject<HTMLInputElement>, ref5: React.RefObject<HTMLInputElement>) => {
            const login = ref1.current?.value;
            const firstname = ref2.current?.value;
            const secondname = ref3.current?.value;
            const password1 = ref4.current?.value;
            const password2 = ref5.current?.value;
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(Account)