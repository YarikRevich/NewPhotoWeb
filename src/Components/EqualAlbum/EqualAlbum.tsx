import React, { useEffect, useState, useRef } from "react";
import Menu from "@material-ui/core/Menu"
import { Redirect } from "react-router-dom"
import type { Components } from "./../../types"
import Button from "@material-ui/core/Button"
import UploadIcon from "@material-ui/icons/CloudUpload"
import { Formik } from "formik"
import classes from "./../../constants/EqualAlbum/EqualAlbum.module.css"
import advancedPanelButton from "./../../constants/AdvancedPanelButton/AdvancedPanelButton.module.css"
import errorClasses from "./../../constants/Errors/Errors.module.css"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import DetailedView from "./../DetailedView/DetailedViewContainer"
import EmptyImage from "./../../assets/images/empty.png"
import Switch from "@material-ui/core/Switch"
import Label from "@material-ui/core/InputLabel"

const AdvancePanel = (props: Components.EqualAlbum.AdvancedPanelType) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const multipleUploader = useRef<HTMLInputElement>(null)
    const directoryUploader = useRef<HTMLInputElement>(null)

    return (
        <div>
            <div className={classes["window"]}>
                <div className={classes["panel"]}>
                    <div>
                        <Switch
                            color={"primary"}
                            checked={props.switched}
                            onChange={props.onSwitch}
                        />
                        <Label>{!props.switched ? "Turn to videos" : "Turn to photos"}</Label>
                    </div>
                    <Menu className={classes["block"]} open={Boolean(anchorEl)} keepMounted anchorEl={anchorEl} >
                        <img className={classes["close-button"]} onClick={() => setAnchorEl(null)} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                        <div className={classes["group"]}>
                            <Formik
                                initialValues={{ directories: [] as any, files: [] as any }}
                                validate={(values) => {
                                    if (values.directories.length == 0 && values.files.length == 0) {
                                        return { directories: "You should add media" }
                                    }
                                }}
                                onSubmit={(values, actions) => {
                                    props.handleFormAdd(props.name, values.directories, values.files)
                                    actions.resetForm()
                                }}
                            >
                                {({ errors, handleSubmit, setFieldValue }) => (
                                    <div className={classes["form"]}>
                                        <span className={errorClasses["error"]}>{errors.directories}</span>
                                        <label htmlFor="directories">Add directory</label>
                                        <input hidden ref={directoryUploader} onChange={(e) => setFieldValue("directories", e.currentTarget.files)} type="file" name="directories" id="directories" directory="" webkitdirectory="" />
                                        <label htmlFor="directories"><Button startIcon={<UploadIcon />} onClick={() => directoryUploader.current?.click()} variant={"contained"}>Upload</Button></label>
                                        <label htmlFor="files">Add media</label>
                                        <input hidden ref={multipleUploader} onChange={(e: any) => setFieldValue("files", e.currentTarget.files)} type="file" name="files" id="files" accept="image/jpeg;image/png;image/jpg;video/mp4;video/avi" multiple />
                                        <label htmlFor="files"><Button startIcon={<UploadIcon />} onClick={() => multipleUploader.current?.click()} variant={"contained"}>Upload</Button></label>
                                        <Button variant={"outlined"} color={"primary"} onClick={() => handleSubmit()} type="button">Download media</Button>
                                    </div>
                                )}
                            </Formik>
                        </div>
                        <div className={classes["options"]}>
                            <Button onClick={() => props.handleDeleteAlbum(props.name)} color={"secondary"}>Delete</Button>
                        </div>
                    </Menu>
                    <div>
                        <img onClick={(e) => setAnchorEl(e.currentTarget)} className={advancedPanelButton["button"]} src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
                    </div>
                </div>
            </div>
        </div >
    )
}

const EqualAlbum = (props: Components.EqualAlbum.EqualAlbumType) => {
    const [anchorEl, setAnchorEl] = useState<any>([])
    const [switched, setSwitched] = useState(false)
    const [page, setPage] = useState(1)
    const size = { width: 100, height: 100 }
    const offset = window.innerWidth / size.width * 10

    useEffect(() => {
        props.getEqualAlbumPhotos(props.name, offset, page)
        props.turnOffRedirect()
    }, [props.equalAlbumPage.isUpdate])

    console.log(props.equalAlbumPage)

    return (
        <div>
            {props.equalAlbumPage.goBack ? <Redirect exact to={"/albums"} /> : null}
            <AdvancePanel
                name={props.name}
                switched={switched}
                onSwitch={() => setSwitched(!switched)}
                handleFormAdd={props.handleFormAdd}
                handleDeleteAlbum={props.handleDeleteAlbum}
            />
            <MediaOrderer
                data={!switched ? props.equalAlbumPage.result.photos : props.equalAlbumPage.result.videos}
                render={(el, i, s) => {
                    return (
                        <div>
                            <img
                                onClick={(e) => {
                                    props.turnOnFullMedia(el.thumbnail, (!switched ? "photos" : "videos"))
                                    const n = anchorEl
                                    n[i] = e.currentTarget
                                    setAnchorEl(n)
                                }}
                                width={s.width}
                                height={s.height}
                                src={el.thumbnail ? `data:image/png;image/jpeg;image/jpg;base64, ${el.thumbnail}` : EmptyImage}
                            />
                            {props.equalAlbumPage.fullMedia.isShown ? (
                                <DetailedView
                                    anchorEl={anchorEl[i]}
                                    visible={props.equalAlbumPage.fullMedia.isShown}
                                    type={!switched ? "photo" : "video"}
                                    onClose={() => {
                                        props.turnOffFullMedia()
                                        setAnchorEl(anchorEl.filter((o: number) => o == i))
                                    }}
                                    media={props.equalAlbumPage.fullMedia.src}
                                    mediaSize={{ height: 300, width: 350 }} />
                            ) : (
                                null
                            )}
                        </div>
                    )
                }}
                mediaSize={size} />
        </div>
    )
}

export default EqualAlbum