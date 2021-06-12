import React, { Dispatch } from "react";
import { Photos } from "./Photos";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { createAddPhotos, createGetPhotos, createTurnOnFullMedia, createTurnOffFullMedia, createSetPhotosByTag, createSetSimilarTags } from "../../redux/photo-reducer"
import { IsChosenTagInTags, GetSomeTagCoincidence } from "../../Helpers/utils"
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
        handleBlur: (ref: React.RefObject<HTMLDivElement>) => {

        },
        handleFocus: (ref: React.RefObject<HTMLDivElement>) => {

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
            tags = ["Yana", "Yarik"]
            dispatch(createSetSimilarTags(GetSomeTagCoincidence(tags, tag)))
        },
        handleSearch: (s: string) => {
            console.log(s)
        },
        handleReset: (ref: React.RefObject<HTMLInputElement>) => {

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
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(Photos)