import React, { Dispatch } from "react";
import { Photos } from "./Media";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "../../hoc/auth"
import { createAddMedia, createGetMedia, createTurnOnFullMedia, createSetSimilarTags, createTurnOffUpdate, createTurnOffFullMedia, createTurnOnUpdate } from "../../redux/media-reducer"
import { GetSomeTagCoincidence } from "../../Helpers/utils"
import type { State, StateComponenents } from "../../types"

const mapStateToProps = (state: State) => {
    return ({
        mediaPage: state.mediaPage,
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        handleSubmit: (f: FileList) => {
            dispatch(createAddMedia(f))
        },
        handleChange: (tag: string, mediaPage: StateComponenents.MediaPage, type: "photos" | "videos") => {
            let tags: string[] = []
            for (const i of (type == "photos" ? mediaPage.result.photos : mediaPage.result.videos)) {
                if (i.tags) {
                    for (const v of i.tags) {
                        if (!tags.includes(v)) tags.push(v)
                    }
                }
            }
            dispatch(createSetSimilarTags(GetSomeTagCoincidence(tags, tag)))
        },
        getMedia: () => {
            dispatch(createGetMedia())
        },
        turnOnFullMedia: (thumbnail: string, type: "photos" | "videos") => {
            dispatch(createTurnOnFullMedia(thumbnail, type))
        },
        turnOffFullMedia: () => {
            dispatch(createTurnOffFullMedia())
        },
        turnOnUpdate: () => {
            dispatch(createTurnOnUpdate())
        },
        turnOffUpdate: () => {
            dispatch(createTurnOffUpdate())
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(Photos)