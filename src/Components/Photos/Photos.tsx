import React, { useEffect, useRef, useState } from "react";
import type { Components } from "./../../types"
import { Formik } from "formik"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import DetailedView from "./../DetailedView/DetailedViewContainer"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Popper from "@material-ui/core/Popper"
import UploadIcon from "@material-ui/icons/CloudUpload"

import EmptyImage from "./../../assets/images/empty.png"
import classes from "./../../constants/PhotoPage/Photos.module.css"
import "../../constants/Index/index.css"

const Panel = (props: Components.Photos.PanelType) => {
    const input = useRef<HTMLInputElement>(null)
    const [pointerOverPopper, setPointerOverPopper] = useState(false)
    const [pointerOverInput, setPointerOverInput] = useState(false)
    const [closePopper, setClosePopper] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    return (
        <div className={classes["panel"]}>
            <Formik
                initialValues={{ files: null as FileList | null }}
                onSubmit={(values, actions) => {
                    if (values.files) {
                        props.handleSubmit(values.files)
                    }
                    actions.resetForm()
                }}
            >
                {({ handleSubmit, setFieldValue }) => (
                    <div>
                        <input
                            ref={input}
                            hidden
                            onChange={(e) => {
                                setFieldValue("files", e.currentTarget.files)
                                handleSubmit()
                            }}
                            type="file"
                            name="files"
                            accept={"image/jpeg, image/png"}
                            multiple />
                        <Button
                            variant={"contained"}
                            startIcon={<UploadIcon />}
                            onClick={() => input.current?.click()}
                            type="button"
                        >Download</Button>
                    </div>
                )}
            </Formik>
            <Input
                autoComplete={"off"}
                onMouseOut={() => setPointerOverInput(false)}
                onMouseOver={() => setPointerOverInput(true)}
                onFocus={(e) => {
                    setClosePopper(false)
                    setAnchorEl(e.currentTarget)
                }}
                onBlur={() => {
                    if (!pointerOverPopper) {
                        setClosePopper(true)
                        setAnchorEl(null)
                    }
                }}
                onChange={(e) => {
                    props.handleChange(e.currentTarget.value, props.photoPage)
                    setAnchorEl(e.currentTarget)
                }}
                type="text"
                name="search"
                placeholder="Photo associations" />
            <Popper
                keepMounted
                onBlur={() => !pointerOverInput && !pointerOverPopper ? setClosePopper(true) : null}
                onMouseOut={() => setPointerOverPopper(false)}
                onMouseOver={() => setPointerOverPopper(true)}
                anchorEl={anchorEl}
                open={props.photoPage.chosenTags.length != 0 && !closePopper}>
                <div className={classes["popper"]}>
                    {props.photoPage.chosenTags.map(el => {
                        return (
                            <Button onClick={() => {
                                setPointerOverPopper(true)
                            }}>{el}</Button>
                        )
                    })}
                </div>
            </Popper>
        </div>
    )
}

export const Photos = (props: Components.Photos.PhotosType) => {
    const [anchorEl, setAnchorEl] = useState<any>([])

    useEffect(() => {
        props.getPhotos()
    }, [props.photoPage.isUpdate])

    return (
        <div className={classes["photo-plate"]}>
            <Panel
                photoPage={props.photoPage}
                handleSubmit={props.handleSubmit}
                handleChange={props.handleChange}
            />
            <MediaOrderer
                data={props.photoPage.result}
                tags={props.photoPage.chosenTags}
                render={(el, i, s) => {
                    return (
                        <div>
                            <img
                                onClick={(e) => {
                                    props.turnOnFullMedia(el.thumbnail)
                                    const n = anchorEl
                                    n[i] = e.currentTarget
                                    setAnchorEl(n)
                                }}
                                width={s.width}
                                height={s.height}
                                src={el.thumbnail ? "data:image/png;image/jpeg;image/jpg;base64, " + el.thumbnail : EmptyImage}
                            />
                            {props.photoPage.fullMedia.isShown ? (
                                <DetailedView
                                    anchorEl={anchorEl[i]}
                                    visible={props.photoPage.fullMedia.isShown}
                                    type={"photo"}
                                    onClose={() => {
                                        props.turnOffFullMedia()
                                        setAnchorEl(anchorEl.filter((o: number) => o == i))
                                    }}
                                    media={props.photoPage.fullMedia.src}
                                    mediaSize={{ height: 100, width: 100 }} />
                            ) : (
                                null
                            )}
                        </div>
                    )
                }}
                mediaSize={{ height: 100, width: 100 }} />
        </div>
    )
}