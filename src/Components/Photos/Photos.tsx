import React, { useEffect, useRef, useState } from "react";
import type { Components } from "./../../types"
import { Formik } from "formik"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import DetailedView from "./../DetailedView/DetailedViewContainer"

import EmptyImage from "./../../assets/images/empty.png"
import classes from "./../../constants/PhotoPage/Photos.module.css"
import "../../constants/Index/index.css"

const Panel = (props: Components.Photos.PanelType) => {
    const div = useRef(null)

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
                onSubmit={(values, actions) => {
                    props.handleSearch(values.search)
                    actions.resetForm()
                }}
            >
                {({ values, handleSubmit, handleChange }) => (
                    <div className={classes["photo-search"]}>
                        <input
                            value={values.search}
                            className={classes["photo-search-input"]}
                            onChange={handleChange}
                            // onFocus={() => props.handleFocus(divTextRef)}
                            // onBlur={() => props.handleBlur(divTextRef)}
                            type="text"
                            name="search"
                            placeholder="Photo associations" />
                        <button
                            // onDoubleClick={() => props.handleReset(formTextInputRef)}
                            onClick={() => handleSubmit()}
                            type="button"
                        >Search!</button>
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
                handleBlur={props.handleBlur}
                handleSubmit={props.handleSubmit}
                handleFocus={props.handleFocus}
                handleChange={props.handleChange}
                handleSearch={props.handleSearch}
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