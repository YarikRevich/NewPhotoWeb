import React, { Dispatch } from "react";
import { Photos } from "./Photos";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { createAddPhotos, createGetPhotos, createTurnOnFullMedia, createTurnOffFullMedia } from "../../redux/photo-reducer"
import { IsChosenTagInTags } from "../../Helpers/utils"
import type { State } from "./../../types"

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
        handleChange: (ref1: React.RefObject<HTMLButtonElement>, ref2: React.RefObject<HTMLInputElement>, ref3: React.RefObject<HTMLDivElement>) => {
            const c = ref2.current;
            const d = ref3.current;
            if (c === null) {
                return
            }

            if (d === null) {
                return
            }

            Array.from(d.children).forEach(el => {
                d?.removeChild(el)
            })
            d.className = "";
            if (c.value.length !== 0) {

            } else {
                d.style.marginTop = "0px";
            }
        },
        handleSearch: (s: string) => {
            console.log(s)
        },
        handleReset: (ref: React.RefObject<HTMLInputElement>) => {

        },
        getPhotos: () => {
            dispatch(createGetPhotos())
        },
        getFullPhoto: (photo: string, thumbnail: string, ref: React.RefObject<HTMLAnchorElement>) => {
            if (photo.length == 0) {
            }
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