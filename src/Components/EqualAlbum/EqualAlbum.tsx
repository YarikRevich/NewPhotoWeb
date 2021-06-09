import React from "react";
import type { Components } from "./../../types"
import { GetRandomName } from "../../Helpers/utils"

//Style constants ...

import classes from "./../../constants/EqualAlbumPage/EqualAlbum.module.css"
import "../../constants/Index/index.css"


const AlbumPhotoTable = (props: Components.EqualAlbum.AlbumPhotoTableType) => {

    const handleDetailedPhoto = () => {
        return (
            <div className={classes["detailed-photo"]}>
                <img className={classes["cross-image"]} src="https://img.icons8.com/metro/26/000000/multiply.png" />
                <div className={classes["window-wrapper"]}>
                    <div className={classes["photo-wrapper"]}>
                        <img src={`data:image/png;image/jpeg;base64, ` + props.albumPage.detailedView.photo} />
                    </div>
                    <div className={classes["download-wrapper"]}>
                        <div className={classes["onemoredown-wrapper"]}>
                            <a href={`data:image/png;image/jpeg;base64, ` + props.albumPage.detailedView.photo} download={GetRandomName()} className={`nav-button ${classes["download-button"]}`}>Download</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    const handlePhotoOrdering = () => {

        let result = new Array<JSX.Element>();
        let children = new Array<JSX.Element>();
        let rowwith = 0;

        const PHOTO_WIDTH = 100;
        const PHOTO_HEIGHT = 100;

        if (props.albumPage.result !== null) {
            props.albumPage.result.map((el: any) => {
                if (((rowwith + PHOTO_WIDTH) <= window.innerWidth) && el.photo.length != 0) {
                    rowwith += PHOTO_WIDTH;
                    children.push(
                        <div className={classes["image"]}>
                            <img onClick={() => { props.setDetailedPhoto(el.photo) }} width={PHOTO_WIDTH} height={PHOTO_HEIGHT} src={"data:image/png;image/jpeg;image/jpg;base64, " + el.photo} />
                        </div>
                    )
                } else {
                    result.push(
                        React.createElement("div", { className: classes["images"] }, ...children)
                    )
                    children = new Array<JSX.Element>();
                    rowwith = 0;
                }
            })
            if (children.length != 0) {
                result.push(
                    React.createElement("div", { className: classes["images"] }, ...children)
                )
            }
            return result
        }
        return Array();
    }

    return (
        <div>
            <div className={classes["back-button"]}>
                <img src="https://img.icons8.com/carbon-copy/60/000000/reply-arrow.png" />
            </div>
            {handleDetailedPhoto()}
            {handlePhotoOrdering()}
        </div>
    )
}


export const EqualAlbum = (props: Components.EqualAlbum.EqualAlbumType) => {
    return <AlbumPhotoTable name={props.name} albumPage={props.albumPage} getEqualAlbumPhotos={props.getEqualAlbumPhotos} setDetailedPhoto={props.setDetailedPhoto} />
}