import React from "react"
import type { Components } from "./../../types/index"
import classes from "./../../constants/DetailedView/DetailedView.module.css"

const DetailedView = (props: Components.DetailedView.DetailedViewType) => {

    return (
        <div className={classes["block"]}>
            <img className={classes["cross-image"]} src={require("./../../assets/images/closecross.png")} />
            <div>
                <div className={classes["media"]}>
                    <img/>
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