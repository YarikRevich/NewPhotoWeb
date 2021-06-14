import React, { Dispatch } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import EqualAlbum from "./EqualAlbum"
import type { State, StateComponenents } from "./../../types"
import { createAddToAlbum, createDeleteAlbum, createGetEqualAlbum, createTurnOffFullMedia, createTurnOnFullMedia, createTurnOnGoBack, createTurnOnUpdate, createTurnOffUpdate } from "../../redux/equalalbum-reducer";
import { createTurnOffRedirect } from "../../redux/albums-reducer";

const mapStateToProps = (state: State, matches: { match: { params: { name: string } } }) => {
    return ({
        equalAlbumPage: state.equalAlbumPage,
        name: matches.match.params.name
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        handleFormAdd: (albumName: string, directories: FileList, files: FileList) => {
            const concated = Array.from(files).concat(Array.from(directories));
            const r = new DataTransfer()

            for (let i of concated) {
                r.items.add(i)
            }

            dispatch(createAddToAlbum(albumName, r.files))
        },
        turnOnGoBack: () => {
            dispatch(createTurnOnGoBack())
        },
        handleDeleteAlbum: (albumName: string) => {
            dispatch(createDeleteAlbum(albumName))
        },
        getEqualAlbumPhotos: (albumName: string, offset: number, page: number) => {
            dispatch(createGetEqualAlbum(albumName, offset, page))
        },
        turnOffRedirect: () => {
            dispatch(createTurnOffRedirect())
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

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(EqualAlbum)