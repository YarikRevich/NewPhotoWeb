import React, { useEffect, useState } from "react";
import { Formik } from "formik"
import type { Components } from "./../../types"
import classes from "./../../constants/AlbumPage/Albums.module.css"
import errorClasses from "./../../constants/Errors/Errors.module.css"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"

import EmptyImage from "./../../assets/images/empty.png"

const AdvancePanel = (props: Components.Albums.AdvancePanelType) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={classes["window"]}>
            {open ?
                (
                    <div className={classes["block"]}>
                        <img onClick={() => setOpen(false)} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                        <div>
                            <div className={classes["group1"]}>
                                <Formik
                                    initialValues={{ albumName: "" }}
                                    validate={(values) => {
                                        if (values.albumName.length == 0) {
                                            return { albumName: "AlbumName is required" }
                                        }
                                    }}
                                    onSubmit={(values, actions) => {
                                        actions.resetForm()
                                    }}
                                >
                                    {({ errors, values, handleChange, handleSubmit }) => (
                                        <div className={classes["form"]}>
                                            <label htmlFor="create">Album name</label>
                                            <input onChange={handleChange} id="create" type="text" name="albumName" placeholder="ex: Summer on the beach"></input>
                                            <span className={errorClasses["error"]}>{errors.albumName}</span>
                                            <button onClick={() => handleSubmit()} type="button">Create an album</button>
                                        </div>
                                    )}
                                </Formik>
                                <Formik
                                    initialValues={{ albumName: "" }}
                                    validate={(values) => {
                                        if (values.albumName.length == 0) {
                                            return { albumName: "AlbumName is required" }
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
                                        console.log(values)
                                        actions.resetForm()
                                    }}
                                >
                                    {({ errors, values, handleChange, handleSubmit }) => (
                                        <div className={classes["form"]}>
                                            <label htmlFor="delete">Album name</label>
                                            <input onChange={handleChange} id="delete" type="text" name="albumName" placeholder="ex: New York holydays"></input>
                                            <span className={errorClasses["error"]}>{errors.albumName}</span>
                                            <button onClick={() => handleSubmit()} type="button">Delete an album</button>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                            <div className={classes["group2"]}>
                                <Formik
                                    initialValues={{ albumName: "", directories: [] as any, files: [] as any }}
                                    validate={(values) => {

                                        if (values.albumName.length == 0) {
                                            return { albumName: "AlbumName is required" }
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
                                            <input onChange={handleChange} type="text" name="albumName" id="albumName" placeholder="ex: Chernobyl trip" />
                                            <span className={errorClasses["error"]}>{errors.albumName}</span>
                                            <label htmlFor="directories">Add directroy</label>
                                            <input onChange={(e) => setFieldValue("directories", e.currentTarget.files)} type="file" name="directories" id="directories" directory="" webkitdirectory="" />
                                            <label htmlFor="files">Add photos</label>
                                            <input onChange={(e) => setFieldValue("files", e.currentTarget.files)} type="file" name="files" id="files" accept="image/jpeg;image/png;image/jpg" multiple />
                                            <button onClick={() => handleSubmit()} type="button">Download photos</button>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                )
                : null}
            <img onClick={() => setOpen(!open)} className={classes["block-button"]} src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
        </div >
    )
}

export const Albums = (props: Components.Albums.AlbumsType) => {
    useEffect(() => {
        props.getAlbums()
    }, [])

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
                                <p>{el.name}</p>
                                <img
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