import React, { Dispatch } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import EqualAlbum from "./EqualAlbum"
import type { State } from "./../../types"
import { createDeleteAlbum, createGetEqualAlbum, createTurnOnGoBack } from "../../redux/equalalbum-reducer";
import { createTurnOffRedirect } from "../../redux/albums-reducer";

const mapStateToProps = (state: State, matches: { match: { params: { name: string } } }) => {
    return ({
        equalAlbumPage: state.equalAlbumPage,
        name: matches.match.params.name
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        turnOnGoBack: () => {
            dispatch(createTurnOnGoBack())
        },
        handleDeleteAlbum: (albumName: string) => {
            dispatch(createDeleteAlbum(albumName))
        },
        getEqualAlbumPhotos: (albumName: string) => {
            dispatch(createGetEqualAlbum(albumName))
        },
        turnOffRedirect: () => {
            dispatch(createTurnOffRedirect())
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(EqualAlbum)