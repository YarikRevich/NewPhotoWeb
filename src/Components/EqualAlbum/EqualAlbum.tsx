import React, { useEffect, useState, useRef } from "react";
import Menu from "@material-ui/core/Menu"
import Input from "@material-ui/core/Input"
import { Redirect } from "react-router-dom"
import type { Components } from "./../../types"
import Button from "@material-ui/core/Button"
import UploadIcon from "@material-ui/icons/CloudUpload"
import Tooltip from "@material-ui/core/Tooltip"
import { Formik } from "formik"
import classes from "./../../constants/EqualAlbum/EqualAlbum.module.css"
import advancedPanelButton from "./../../constants/AdvancedPanelButton/AdvancedPanelButton.module.css"
import errorClasses from "./../../constants/Errors/Errors.module.css"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"

const AdvancePanel = (props: Components.EqualAlbum.AdvancedPanelType) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const multipleUploader = useRef<HTMLInputElement>(null)
    const directoryUploader = useRef<HTMLInputElement>(null)

    return (
        <div>
            <div className={classes["window"]}>
                <Menu className={classes["block"]} open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} >
                    <img className={classes["close-button"]} onClick={() => setAnchorEl(null)} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                    <div className={classes["group"]}>
                        <Formik
                            initialValues={{ directories: [] as any, files: [] as any }}
                            validate={(values) => {
                                if (values.directories.length == 0) {
                                    return { directories: "You should add media" }
                                }
                                if (values.files.length == 0) {
                                    return { files: "You should add media" }
                                }
                            }}
                            onSubmit={(values, actions) => {
                                actions.resetForm()
                            }}
                        >
                            {({ errors, handleSubmit, setFieldValue }) => (
                                <div className={classes["form"]}>
                                    <label htmlFor="directories">Add directroy</label>
                                    <input hidden ref={directoryUploader} onChange={(e) => setFieldValue("directories", e.currentTarget.files)} type="file" name="directories" id="directories" directory="" webkitdirectory="" />
                                    <span className={errorClasses["error"]}>{errors.directories}</span>
                                    <label htmlFor="directories"><Button startIcon={<UploadIcon />} onClick={() => directoryUploader.current?.click()} variant={"contained"}>Upload</Button></label>
                                    <label htmlFor="files">Add photos</label>
                                    <input hidden ref={multipleUploader} onChange={(e: any) => setFieldValue("files", e.currentTarget.files)} type="file" name="files" id="files" accept="image/jpeg;image/png;image/jpg" multiple />
                                    <span className={errorClasses["error"]}>{errors.files}</span>
                                    <label htmlFor="files"><Button startIcon={<UploadIcon />} onClick={() => multipleUploader.current?.click()} variant={"contained"}>Upload</Button></label>
                                    <Button variant={"outlined"} color={"primary"} onClick={() => handleSubmit()} type="button">Download photos</Button>
                                </div>
                            )}
                        </Formik>
                    </div>
                    <div className={classes["options"]}>
                        <Button color={"secondary"}>Delete</Button>
                    </div>
                </Menu>
            </div>
            <img onClick={(e) => setAnchorEl(e.currentTarget)} className={advancedPanelButton["button"]} src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
        </div >
    )
    // return (
    //     // <div className={classes["panel"]} >
    //     //     <Tooltip title={"Deletes opened album"}>
    //     //         <Button onClick={() => props.handleDeleteAlbum(props.name)} color={"primary"}>Delete</Button>
    //     //     </Tooltip >
    //     // </div>
    // )
}

const EqualAlbum = (props: Components.EqualAlbum.EqualAlbumType) => {
    useEffect(() => {
        props.getEqualAlbumPhotos(props.name)
        props.turnOffRedirect()
    }, [])

    return (
        <div>
            {props.equalAlbumPage.goBack ? <Redirect exact to={"/albums"} /> : null}
            <AdvancePanel handleDeleteAlbum={props.handleDeleteAlbum} name={props.name} />
            <MediaOrderer
                data={props.equalAlbumPage.result}
                render={(el, i, s) => {
                    return (
                        <img width={s.width} height={s.height} src={el.thumbnail} />
                    )
                }}
                mediaSize={{ width: 100, height: 100 }} />
        </div>
    )
}

export default EqualAlbum