import React, { useEffect } from "react";
import { Redirect } from "react-router-dom"
import type { Components } from "./../../types"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import { Formik } from "formik"
import classes from "./../../constants/EqualAlbumPage/EqualAlbum.module.css"
import errorClasses from "./../../constants/Errors/Errors.module.css"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"
import KebabMenu from "./../../assets/images/menukebab.png"

const AdvancePanel = (props: Components.EqualAlbum.AdvancedPanelType) => {
    return (
        <div className={classes["panel"]} >
            <Tooltip title={"Deletes opened album"}>
                <Button onClick={() => props.handleDeleteAlbum(props.name)} color={"primary"}>Delete</Button>
            </Tooltip >
        </div>
    )
}

const EqualAlbum = (props: Components.EqualAlbum.EqualAlbumType) => {
    useEffect(() => {
        props.getEqualAlbumPhotos(props.name)
        props.turnOffRedirect()
    }, [])

    return (
        <div>
            {props.equalAlbumPage.goBack ? <Redirect exact to={"/albums"} /> : null}
            <AdvancePanel handleDeleteAlbum={props.handleDeleteAlbum} name={props.name} />
            <MediaOrderer
                data={props.equalAlbumPage.result}
                render={(el, i, s) => {
                    return (
                        <img width={s.width} height={s.height} src={el.thumbnail} />
                    )
                }}
                mediaSize={{ width: 100, height: 100 }} />
        </div>
    )
}

export default EqualAlbum