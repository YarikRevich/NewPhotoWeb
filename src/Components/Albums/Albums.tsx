import React, { useEffect, useState } from "react";
import { Formik } from "formik"
import type { Components } from "./../../types"
import classes from "./../../constants/AlbumPage/Albums.module.css"
import "../../constants/Index/index.css"
import MediaOrdererContainer from "./../MediaOrderer/MediaOrdererContainer"

const AdvancePanel = (props: Components.Albums.AdvancePanelType) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            {open ?
                (
                    <div className={classes["advanced-panel"]}>
                        <img className={classes["cross-image"]} onClick={() => setOpen(false)} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                        <div className={classes["advanced-panel-form"]}>
                            <div className={classes["create-delete-forms"]}>
                                <Formik
                                    initialValues={{ albumName: "" }}
                                    onSubmit={(values, actions) => {
                                        console.log(values)
                                    }}
                                >
                                    {({ values, handleChange, handleSubmit }) => (
                                        <div className={classes["create-album"]}>
                                            <div className={classes["create-album-form"]}>
                                                <label htmlFor="create">Album name</label>
                                                <input onChange={handleChange} id="create" type="text" name="albumName" placeholder="ex: Summer on the beach"></input>
                                                <button onClick={() => handleSubmit()} type="button">Create an album</button>
                                            </div>
                                        </div>
                                    )}
                                </Formik>
                                <Formik
                                    initialValues={{ albumName: "" }}
                                    onSubmit={(values, actions) => {
                                        console.log(values)
                                    }}
                                >
                                    {({ values, handleChange, handleSubmit }) => (
                                        <div className={classes["delete-album"]}>
                                            <form className={classes["delete-album-form"]}>
                                                <label htmlFor="delete">Album name</label>
                                                <input onChange={handleChange} id="delete" type="text" name="albumName" placeholder="ex: New York holydays"></input>
                                                <button onClick={() => handleSubmit()} type="button">Delete an album</button>
                                            </form>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                            <div className={classes["add-form"]}>
                                <Formik
                                    initialValues={{ albumName: "", directories: null, files: null }}
                                    onSubmit={(values, actions) => {
                                        console.log(values)
                                    }}
                                >
                                    {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                        <div className={classes["add-photo-to-album"]}>
                                            <form encType="multipart/form-data" className={classes["add-photo-to-album-form"]}>
                                                <label htmlFor="albumName">Album name</label>
                                                <input onChange={handleChange} type="text" name="albumName" id="albumName" placeholder="ex: Chernobyl trip" />
                                                <label htmlFor="directories">Add directroy</label>
                                                <input onChange={(e) => setFieldValue("directories", e.currentTarget.files)} type="file" name="directories" id="directories" directory="" webkitdirectory="" />
                                                <label htmlFor="files">Add photos</label>
                                                <input onChange={(e) => setFieldValue("files", e.currentTarget.files)} type="file" name="files" id="files" accept="image/jpeg;image/png;image/jpg" multiple />
                                                <button onClick={() => handleSubmit()} type="button">Download photos</button>
                                            </form>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                )
                : null}
            <img onClick={() => setOpen(!open)} className={classes["advance-panel-button"]} src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
        </div>
    )
}

export const Albums = (props: Components.Albums.AlbumsType) => {
    useEffect(() => {
        props.getAlbums()
    }, [])

    return (
        <div className="album-page">
            <div className="album-page-forms">
                <AdvancePanel albumsPage={props.albumsPage} handleFormAdd={props.handleFormAdd} handleFormCreate={props.handleFormCreate} handleFormDelete={props.handleFormDelete} />
            </div>
            <div>
                <MediaOrdererContainer type={"albums"} mediaSize={{height: 100, width: 100}}/>
            </div>
        </div>
    )

}