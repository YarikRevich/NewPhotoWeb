import React, { useEffect, useRef, useState } from "react";
import type { Components } from "./../../types"
import { Formik } from "formik"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import DetailedView from "./../DetailedView/DetailedViewContainer"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Popper from "@material-ui/core/Popper"


import EmptyImage from "./../../assets/images/empty.png"
import classes from "./../../constants/PhotoPage/Photos.module.css"
import "../../constants/Index/index.css"

const Panel = (props: Components.Photos.PanelType) => {
    const div = useRef(null)
    const popper = useRef<HTMLDivElement>(null)
    const [pointerOverPopper, setPointerOverPopper] = useState(false)
    const [pointerOverInput, setPointerOverInput] = useState(false)
    const [closePopper, setClosePopper] = useState(false)
    const [anchorEl, setAnchorEl] = useState<any>(null)

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
                        <span>Option panel</span>
                        <div className={classes["panel-add-photo-form"]}>
                            <input onChange={(e) => setFieldValue("files", e.currentTarget.files)} type="file" name="files" accept={"image/jpeg, image/png"} multiple />
                            <button onClick={() => handleSubmit()} type="button">Download</button>
                        </div>
                    </div>
                )}
            </Formik>
            <Formik
                initialValues={{ search: "" }}
                onSubmit={() => { }}
            >
                {({ values, handleChange, setFieldValue }) => (
                    <div className={classes["photo-search"]}>
                        <Input
                            autoComplete={"off"}
                            value={values.search}
                            className={classes["photo-search-input"]}
                            onMouseOut={() => setPointerOverInput(false)}
                            onMouseOver={() => setPointerOverInput(true)}
                            onFocus={() => setClosePopper(false)}
                            onBlur={() => !pointerOverPopper ? setClosePopper(true) : null}
                            onChange={(e) => {
                                handleChange(e)
                                props.handleChange(e.currentTarget.value, props.photoPage)
                                setAnchorEl(e.currentTarget)
                            }}
                            type="text"
                            name="search"
                            placeholder="Photo associations" />
                        <Popper onBlur={() => !pointerOverInput && !pointerOverPopper ? setClosePopper(true) : null} onMouseOut={() => setPointerOverPopper(false)} onMouseOver={() => setPointerOverPopper(true)} anchorEl={anchorEl} open={props.photoPage.chosenTags.length != 0 && !closePopper}>
                            <div className={classes["popper"]} >
                                {props.photoPage.chosenTags.map(el => {
                                    return (
                                        <Button onClick={() => {
                                            setFieldValue("search", el)
                                            setPointerOverPopper(true)
                                        }}>{el}</Button>
                                    )
                                })}
                            </div>
                        </Popper>
                        <div ref={div}></div>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export const Photos = (props: Components.Photos.PhotosType) => {
    const [anchorEl, setAnchorEl] = useState<any>([])

    useEffect(() => {
        props.getPhotos()
    }, [])

    return (
        <div className={classes["photo-plate"]}>
            <Panel
                photoPage={props.photoPage}
                handleBlur={props.handleBlur}
                handleSubmit={props.handleSubmit}
                handleFocus={props.handleFocus}
                handleChange={props.handleChange}
                handleReset={props.handleReset}
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