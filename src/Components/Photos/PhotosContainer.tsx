import React, { Dispatch } from "react";
import { Photos } from "./Photos";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { createAddPhotos, createGetPhotos, createTurnOnFullMedia, createSetSimilarTags, createTurnOffUpdate, createTurnOffFullMedia, createTurnOnUpdate } from "../../redux/photo-reducer"
import { GetSomeTagCoincidence } from "../../Helpers/utils"
import type { State, StateComponenents } from "./../../types"

const mapStateToProps = (state: State) => {
    return ({
        photoPage: state.photoPage
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        handleSubmit: (f: FileList) => {
            dispatch(createAddPhotos(f))
        },
        handleChange: (tag: string, photoPage: StateComponenents.PhotoPage) => {
            let tags: string[] = []
            for (const i of photoPage.result) {
                if (i.tags) {
                    for (const v of i.tags) {
                        if (!tags.includes(v)) tags.push(v)
                    }
                }
            }
            dispatch(createSetSimilarTags(GetSomeTagCoincidence(tags, tag)))
        },
        getPhotos: () => {
            dispatch(createGetPhotos())
        },
        turnOnFullMedia: (thumbnail: string) => {
            dispatch(createTurnOnFullMedia(thumbnail))
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