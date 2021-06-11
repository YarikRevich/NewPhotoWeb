import React, { useRef, useState } from "react"
import type { Components } from "./../../types/index"
import classes from "./../../constants/DetailedView/DetailedView.module.css"
import CrossButton from "./../../assets/images/closecross.png"
import { GetRandomName } from "../../Helpers/utils"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"

const DetailedView = (props: Components.DetailedView.DetailedViewType) => {
    const download = useRef<HTMLAnchorElement>(null)

    return (
        <Menu open={Boolean(props.anchorEl)} keepMounted anchorEl={props.anchorEl}>
            <div className={classes["block"]}>
                <img className={classes["close-button"]} onClick={props.onClose} src={CrossButton} />
                <div className={classes["group"]}>
                    <div className={classes["media"]}>
                        {props.type == "photo" ? (
                            <img width={props.mediaSize.width} height={props.mediaSize.height} src={`data:image/png;image/jpeg;image/jpg;base64, ${props.media}`} />
                        ) : (
                            <video width={props.mediaSize.width} height={props.mediaSize.height} src={`data:image/png;image/jpeg;image/jpg;base64, ${props.media}`} />
                        )}
                    </div>
                    <div className={classes["download"]}>
                        <a hidden ref={download} href={`data:image/png;image/jpeg;image/jpg;base64, ${props.media}`} download={GetRandomName()} />
                        <Button variant={"outlined"} color={"primary"} onClick={() => download.current?.click()}>Download</Button>
                    </div>
                </div>
            </div>
        </Menu>
    )
}

export default DetailedView