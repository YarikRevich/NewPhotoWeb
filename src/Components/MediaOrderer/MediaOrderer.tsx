import React, { useEffect, useState } from "react"
import type { Components, Util } from "./../../types/index"
import { OrderByTags } from "./../../Helpers/utils"
import classes from "./../../constants/MediaOrderer/MediaOrderer.module.css"
import EmptyImage from "./../../assets/images/empty.png"
import NoMediaImage from "./../../assets/images/nomedia.png"


function MediaOrderer<T>(props: Components.MediaOrderer.MediaOrdererType<T>) {

    const [update, setUpdate] = useState(0)
    window.onresize = () => {
        setUpdate(update + 1)
    }
    if (!props.data) throw "Data shouldn't be null"

    const result: JSX.Element[] = []
    const children: JSX.Element[] = []
    let rowRate = 0;

    const media = props.tags ? OrderByTags(props.data, props.tags) : props.data

    media.map((el: T, i: number) => {
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
                {props.render(el, i, props.mediaSize)}
            </div>
        );

    })
    if (children.length != 0) {
        result.push(
            React.createElement("div", { className: classes["media"] }, ...children)
        )
    }

    return result.length == 0 ? (
        <div className={classes["no-media-announcement"]}>
            <img src={NoMediaImage} />
            <h1>It's empty</h1>
        </div>
    ) : <div>{result}</div>
}

export default MediaOrderer