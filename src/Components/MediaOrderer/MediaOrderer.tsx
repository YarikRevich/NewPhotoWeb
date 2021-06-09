import React, { useEffect, useState } from "react"
import type { Components } from "./../../types/index"
import { OrderByTags } from "./../../Helpers/utils"
import classes from "./../../constants/MediaOrderer/MediaOrderer.module.css"
import EmptyImage from "./../../assets/images/empty.png"

const MediaOrderer = (props: Components.MediaOrderer.MediaOrdererType) => {
    //const aDownloadRef: React.RefObject<HTMLAnchorElement> = React.createRef();
    const [update, setUpdate] = useState(0)
    const result: JSX.Element[] = []
    const children: JSX.Element[] = []
    let rowRate = 0;

    window.onresize = () => {
        setUpdate(update + 1)
    }

    const media = props.type == "photo" ? (
        OrderByTags(props.photoPage.result, props.photoPage.chosenTags)
    ) : props.type == "video" ? (
        OrderByTags(props.videoPage.result, props.videoPage.chosenTags)
    ) : (
        props.albumsPage.result
    )

    media.map((el: any, i: number) => {
        if (!((((rowRate + props.mediaSize.width) <= window.innerWidth)))) {
            result.push(
                React.createElement("div", { className: classes["media"], key: i }, ...children)
            )
            children.length = 0
            rowRate = 0;
            return
        }
        rowRate += props.mediaSize.width;

        children.push(
            <div>
                {props.type == "photo" ?
                    <img
                        width={props.mediaSize.width}
                        height={props.mediaSize.height}
                        src={el.thumbnail ? "data:image/png;image/jpeg;image/jpg;base64, " + el.thumbnail : EmptyImage}
                    />
                    :
                    props.type == "video" ?
                        <video
                            width={props.mediaSize.width}
                            height={props.mediaSize.height}
                            src={el.thumbnail ? "data:video/mp4;base64, " + el.thumbnail : EmptyImage}
                        /> :
                        (
                            <div>
                                <p>{el.name}</p>
                                <img
                                    width={props.mediaSize.width}
                                    height={props.mediaSize.height}
                                    src={el.latestphotothumbnail ? "data:image/png;image/jpeg;image/jpg;base64, " + el.latestphotothumbnail : EmptyImage}
                                />
                            </div>
                        )
                }
            </div>
        );

    })
    if (children.length != 0) {
        result.push(
            React.createElement("div", { className: classes["media"] }, ...children)
        )
    }

    return (props.type == "photo" ? !props.photoPage.result : props.type == "video" ? !props.videoPage.result : !props.albumsPage.result) ? (
        <div className={classes["no-media-announcement"]}>
            <img src={require("./../../assets/images/nomedia.png")} />
            <h1>There are no {props.type == "photo" ? "photos" : props.type == "video" ? "videos" : "albums"}</h1>
        </div>
    ) : <div>{result}</div>
}

export default MediaOrderer