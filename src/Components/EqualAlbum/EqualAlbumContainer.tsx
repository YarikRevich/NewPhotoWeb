import React, { Dispatch } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { EqualAlbum } from "./EqualAlbum"
import type { State } from "./../../types"
import { createGetEqualAlbum } from "../../redux/album-reducer";

const mapStateToProps = (state: State, matches: { match: { params: { name: string } } }) => {
    return ({
        equalAlbum: state.equalAlbumPage,
        name: matches.match.params.name
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        getEqualAlbumPhotos: (albumName: string) => {
            dispatch(createGetEqualAlbum(albumName))
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(EqualAlbum)