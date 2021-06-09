import React from "react"
import { Formik } from "formik"
import { Redirect } from "react-router-dom"
import classes from "./../../../constants/SignUp/SignUp.module.css"
import { Components } from "../../../types"

const SignUp = (props: Components.Auth.SignUp.SignUpType) => {
    if (props.isSignedUp) return <Redirect to={"/account/sign_in"} />

    return (
        <Formik
            initialValues={{ login: "", firstname: "", secondname: "", password1: "", password2: "" }}
            onSubmit={(values, actions) => {
                props.handleSubmit(values)
                actions.resetForm()
            }}
        >
            {({ values, handleChange, handleSubmit }) =>
            (
                <div className={classes["block"]}>
                    <label htmlFor="login">Your login</label>
                    <input value={values.login} onChange={handleChange} id="login" type="text" name="login" placeholder="ex. yarik" />
                    <label htmlFor="firstname">Your Firstname</label>
                    <input value={values.firstname} onChange={handleChange} id="firstname" type="text" name="firstname" placeholder="ex. Yaroslav" />
                    <label htmlFor="secondname">Your Secondname</label>
                    <input value={values.secondname} onChange={handleChange} id="secondname" type="text" name="secondname" placeholder="ex. Svitlitskyi" />
                    <label htmlFor="password1">Write password!</label>
                    <input value={values.password1} onChange={handleChange} id="password1" type="password" name="password1" placeholder="ex. yarik042004" />
                    <label htmlFor="password2">Confirm password</label>
                    <input value={values.password2} onChange={handleChange} id="password2" type="password" name="password2" placeholder="ex. yarik042004" />
                    <button type="button" onClick={() => handleSubmit()}>Sign up!</button>
                </div>
            )
            }
        </Formik>
    )
}

export default SignUp