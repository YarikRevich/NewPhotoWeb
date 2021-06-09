import React, { Dispatch } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { EqualAlbum } from "./EqualAlbum"
import type { State } from "./../../types"

const mapStateToProps = (state: State, matches: {match: {params: {name: string}}}) => {
    return ({
        albumPage: state.albumPage,
        name: matches.match.params.name
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        getEqualAlbumPhotos: (name: string) => {
        },
        setDetailedPhoto: (photo: string) => {
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(EqualAlbum)