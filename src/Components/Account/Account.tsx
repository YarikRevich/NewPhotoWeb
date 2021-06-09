import React, { useEffect } from "react";
import { Redirect } from "react-router-dom"
import classes from "./../../constants/AccountPage/Account.module.css"
import "../../constants/Index/index.css"

import type { Components } from "./../../types"

export const Account = (props: Components.Account.AccountType) => {

    useEffect(() => {
        props.getAccountInfo()
    }, [])

    return (
        <div className={classes["account-table"]}>
            <div className={classes["account-lable"]}><label>Account</label></div>
            <div className={classes["info"]}>
                <div className={classes["userinfo"]}><label className={classes["userinfo-label"]}>Firstname: </label><span className={classes["userinfo-info"]}>&nbsp; {props.accountPage.result.firstname}</span></div>
                <div className={classes["userinfo"]}><label className={classes["userinfo-label"]}>Secondname: </label><span className={classes["userinfo-info"]}>&nbsp; {props.accountPage.result.secondname}</span></div>
                <div className={classes["userinfo"]}><label className={classes["userinfo-label"]}>Storage: </label><span className={classes["userinfo-info"]}>&nbsp; {props.accountPage.result.storage}gb</span></div>
            </div>
            <div>
                <form>
                    <button onClick={props.handleLogout} type="button" className="nav-button" id={classes["logout-button"]}>Logout</button>
                </form>
            </div>
        </div>
    )
}

