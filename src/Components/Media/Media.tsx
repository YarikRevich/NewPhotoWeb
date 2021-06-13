import React, { useEffect, useRef, useState } from "react";
import type { Components } from "../../types"
import { Formik } from "formik"
import MediaOrderer from "../MediaOrderer/MediaOrderer"
import DetailedView from "../DetailedView/DetailedViewContainer"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Popper from "@material-ui/core/Popper"
import UploadIcon from "@material-ui/icons/CloudUpload"
import Switch from "@material-ui/core/Switch"
import Label from "@material-ui/core/InputLabel"

import EmptyImage from "./../../assets/images/empty.png"
import classes from "./../../constants/PhotoPage/Photos.module.css"
import "../../constants/Index/index.css"

const Panel = (props: Components.Media.AdvancedPanelType) => {
    const input = useRef<HTMLInputElement>(null)
    const [pointerOverPopper, setPointerOverPopper] = useState(false)
    const [pointerOverInput, setPointerOverInput] = useState(false)
    const [closePopper, setClosePopper] = useState(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    return (
        <div className={classes["panel"]}>
            <div>
                <Switch
                    checked={props.switched}
                    onChange={props.onSwitch}
                />
                <Label>{!props.switched ? "Turn to videos" : "Turn to photos"}</Label>
            </div>
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
                            accept={"image/jpeg, image/png, video/mp4, video/heic"}
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
                    props.handleChange(e.currentTarget.value, props.mediaPage, !props.switched ? "photos" : "videos")
                    setAnchorEl(e.currentTarget)
                }}
                type="text"
                name="search"
                placeholder="Your associations" />
            <Popper
                keepMounted
                onBlur={() => !pointerOverInput && !pointerOverPopper ? setClosePopper(true) : null}
                onMouseOut={() => setPointerOverPopper(false)}
                onMouseOver={() => setPointerOverPopper(true)}
                anchorEl={anchorEl}
                open={props.mediaPage.chosenTags.length != 0 && !closePopper}>
                <div className={classes["popper"]}>
                    {props.mediaPage.chosenTags.map(el => {
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

export const Photos = (props: Components.Media.MediaType) => {
    const [anchorEl, setAnchorEl] = useState<any>([])
    const [switched, setSwitched] = useState(false)

    useEffect(() => {
        props.getMedia()
    }, [props.mediaPage.isUpdate])

    return (
        <div className={classes["photo-plate"]}>
            <Panel
                mediaPage={props.mediaPage}
                switched={switched}
                onSwitch={() => setSwitched(!switched)}
                handleSubmit={props.handleSubmit}
                handleChange={props.handleChange}
            />
            <MediaOrderer
                data={!switched ? props.mediaPage.result.photos : props.mediaPage.result.videos}
                tags={props.mediaPage.chosenTags}
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
                                src={el.thumbnail ? "data:image/png;image/jpeg;image/jpg;base64, " + el.thumbnail : EmptyImage}
                            />
                            {props.mediaPage.fullMedia.isShown ? (
                                <DetailedView
                                    anchorEl={anchorEl[i]}
                                    visible={props.mediaPage.fullMedia.isShown}
                                    type={!switched ? "photo" : "video"}
                                    onClose={() => {
                                        props.turnOffFullMedia()
                                        setAnchorEl(anchorEl.filter((o: number) => o == i))
                                    }}
                                    media={props.mediaPage.fullMedia.src}
                                    mediaSize={{ height: 300, width: 350 }} />
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