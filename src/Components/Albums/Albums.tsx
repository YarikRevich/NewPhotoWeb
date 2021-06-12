import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import { Formik } from "formik"
import Menu from "@material-ui/core/Menu"
import type { Components } from "./../../types"
import classes from "./../../constants/AlbumPage/Albums.module.css"
import advancedPanelButton from "./../../constants/AdvancedPanelButton/AdvancedPanelButton.module.css"
import errorClasses from "./../../constants/Errors/Errors.module.css"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import Preloader from "./../Preloader/Preloader"

import EmptyImage from "./../../assets/images/empty.png"
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const AdvancePanel = (props: Components.Albums.AdvancePanelType) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    return (
        <div className={classes["window"]}>
            <Menu className={classes["block"]} open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} >
                <img className={classes["close-button"]} onClick={() => setAnchorEl(null)} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                <div className={classes["group1"]}>
                    <Formik
                        initialValues={{ albumName: "" }}
                        validate={(values) => {
                            if (values.albumName.length == 0) {
                                return { albumName: "Album name is required" }
                            }
                        }}
                        onSubmit={(values, actions) => {
                            props.handleFormCreate(values.albumName)
                            actions.resetForm()
                        }}
                    >
                        {({ errors, handleChange, handleSubmit }) => (
                            <div className={classes["form"]}>
                                <label htmlFor="create">Album name</label>
                                <Input onChange={handleChange} id="create" type="text" name="albumName" placeholder="ex: Summer on the beach" />
                                <span className={errorClasses["error"]}>{errors.albumName}</span>
                                <Button color={"primary"} onClick={() => handleSubmit()} type="button">Create an album</Button>
                            </div>
                        )}
                    </Formik>
                </div>
            </Menu>
            <img onClick={(e) => setAnchorEl(e.currentTarget)} className={advancedPanelButton["button"]} src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
        </div >
    )
}

export const Albums = (props: Components.Albums.AlbumsType) => {
    useEffect(() => {
        props.getAlbums()
    }, [props.albumsPage.isUpdate])

    if (props.albumsPage.isUpdate) return <Preloader />

    return (
        <div>
            <div>
                <AdvancePanel albumsPage={props.albumsPage} handleFormAdd={props.handleFormAdd} handleFormCreate={props.handleFormCreate} handleFormDelete={props.handleFormDelete} />
            </div>
            <div>
                <MediaOrderer
                    data={props.albumsPage.result}
                    render={(el, i, s) => {
                        return (
                            <div>
                                {props.albumsPage.redirect.isRedirect ? <Redirect exact to={props.albumsPage.redirect.to} /> : null}
                                <p>{el.name}</p>
                                <img
                                    onClick={() => props.turnOnRedirect(`/album/${el.name}`)}
                                    width={s.width}
                                    height={s.height}
                                    src={el.latestphotothumbnail ? `data:image/png;image/jpeg;image/jpg;base64, ${el.latestphotothumbnail}` : EmptyImage}
                                />
                            </div>
                        )
                    }}
                    mediaSize={{ height: 100, width: 100 }} />
            </div>
        </div>
    )

}