import React, { useState } from "react"
import type { Components } from "./../../types/index"
import classes from "./../../constants/DetailedView/DetailedView.module.css"
import CrossButton from "./../../assets/images/closecross.png"

const DetailedView = (props: Components.DetailedView.DetailedViewType) => {
    return (
        <div className={classes["block"]} hidden={!props.visible}>
            <img className={classes["cross-image"]} onClick={props.onClose} src={CrossButton} />
            <div>
                <div className={classes["media"]}>
                    {props.type == "photo" ? (
                        <img width={props.mediaSize.width} height={props.mediaSize.height} src={props.media} />
                    ) : (
                        <video width={props.mediaSize.width} height={props.mediaSize.height} src={props.media} />
                    )}
                </div>
                <div className={classes["download"]}>
                    {/* <a onClick={() => { props.getFullPhoto(props.photoPage.detailedPhotoView.photo, props.photoPage.detailedPhotoView.thumbnail, aDownloadRef) }} className={`nav-button ${classes["download-button"]}`}>
                                Download
                                    <div>
                                    <a ref={aDownloadRef} download={GetRandomName()}></a>
                                </div>
                            </a> */}
                </div>
            </div>
        </div>
    )
}

export default DetailedView