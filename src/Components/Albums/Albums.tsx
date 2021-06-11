import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom"
import { Formik } from "formik"
import Menu from "@material-ui/core/Menu"
import type { Components } from "./../../types"
import classes from "./../../constants/AlbumPage/Albums.module.css"
import errorClasses from "./../../constants/Errors/Errors.module.css"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import Preloader from "./../Preloader/Preloader"

import EmptyImage from "./../../assets/images/empty.png"
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import UploadIcon from "@material-ui/icons/CloudUpload";

const AdvancePanel = (props: Components.Albums.AdvancePanelType) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const multipleUploader = useRef<HTMLInputElement>(null)
    const directoryUploader = useRef<HTMLInputElement>(null)

    return (
        <div className={classes["window"]}>
            <Menu className={classes["block"]} open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} >
                <img className={classes["close-button"]} onClick={() => setAnchorEl(null)} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                <div>
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
                            {({ errors, values, handleChange, handleSubmit }) => (
                                <div className={classes["form"]}>
                                    <label htmlFor="create">Album name</label>
                                    <Input onChange={handleChange} id="create" type="text" name="albumName" placeholder="ex: Summer on the beach" />
                                    <span className={errorClasses["error"]}>{errors.albumName}</span>
                                    <Button color={"primary"} onClick={() => handleSubmit()} type="button">Create an album</Button>
                                </div>
                            )}
                        </Formik>
                    </div>
                    <div className={classes["group2"]}>
                        <Formik
                            initialValues={{ albumName: "", directories: [] as any, files: [] as any }}
                            validate={(values) => {

                                if (values.albumName.length == 0) {
                                    return { albumName: "Album name is required" }
                                }
                                if (props.albumsPage.result) {
                                    const albumExists = (): boolean => {
                                        for (const i of props.albumsPage.result) {
                                            if (i.name == values.albumName) return true
                                        }
                                        return false
                                    }
                                    if (!albumExists()) {
                                        return { albumName: "Such album does not exist" }
                                    }
                                }

                            }}
                            onSubmit={(values, actions) => {
                                props.handleFormAdd(values.albumName, values.directories, values.files)
                                actions.resetForm()
                            }}
                        >
                            {({ errors, values, handleChange, handleSubmit, setFieldValue }) => (
                                <div className={classes["form"]}>
                                    <label htmlFor="albumName">Album name</label>
                                    <Input onChange={handleChange} type="text" name="albumName" id="albumName" placeholder="ex: Chernobyl trip" />
                                    <span className={errorClasses["error"]}>{errors.albumName}</span>
                                    <label htmlFor="directories">Add directroy</label>
                                    <input hidden ref={directoryUploader} onChange={(e) => setFieldValue("directories", e.currentTarget.files)} type="file" name="directories" id="directories" directory="" webkitdirectory="" />
                                    <label htmlFor="directories"><Button startIcon={<UploadIcon />} onClick={() => directoryUploader.current?.click()} variant={"contained"}>Upload</Button></label>
                                    <label htmlFor="files">Add photos</label>
                                    <input hidden ref={multipleUploader} onChange={(e: any) => setFieldValue("files", e.currentTarget.files)} type="file" name="files" id="files" accept="image/jpeg;image/png;image/jpg" multiple />
                                    <label htmlFor="files"><Button startIcon={<UploadIcon />} onClick={() => multipleUploader.current?.click()} variant={"contained"}>Upload</Button></label>
                                    <Button color={"primary"} onClick={() => handleSubmit()} type="button">Download photos</Button>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </Menu>
            <img onClick={(e) => setAnchorEl(e.currentTarget)} className={classes["block-button"]} src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
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
                                    src={el.latestphotothumbnail ? "data:image/png;image/jpeg;image/jpg;base64, " + el.latestphotothumbnail : EmptyImage}
                                />
                            </div>
                        )
                    }}
                    mediaSize={{ height: 100, width: 100 }} />
            </div>
        </div>
    )

}