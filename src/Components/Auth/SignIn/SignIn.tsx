import React, { useState, useEffect, useMemo } from "react"
import { Redirect } from "react-router-dom"
import { Formik } from "formik"
import { Components } from "../../../types"

const SignIn = (props: Components.Auth.SignIn.SignInType) => {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        props.turnOffSignedUp()
    }, [props.isSignedUp])

    if (props.isAuthed) return <Redirect to={"/photos"} />
    return (
        <div>
            <Formik
                initialValues={{ login: "", password: "" }}
                onSubmit={(values, actions) => {
                    props.handleSubmit(values)
                    actions.resetForm()
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <div>
                        <h1>You have to login</h1>
                        <input value={values.login} onChange={handleChange} type="text" name="login" />
                        <input value={values.password} onChange={handleChange} type="password" name="password" autoComplete="on" />
                        <button type="button" onClick={() => handleSubmit()}>Sign in</button>

                    </div>
                )}

            </Formik>
            <p>If you are not registrated click the button <button type="button" onClick={() => setRedirect(true)}>Sign up!</button></p>
            {redirect ? <Redirect to={"/account/sign_up"} /> : null}
        </div>
    )
}

export default SignIn