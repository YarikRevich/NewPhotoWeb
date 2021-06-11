import React, { Dispatch } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { Albums } from "./Albums"
import { createCreateAlbum, createGetAlbums, createTurnOnUpdate, createTurnOffUpdate, createTurnOnRedirect } from "../../redux/albums-reducer";
import { State } from "../../types";


const mapStateToProps = (state: State) => {
    return ({
        albumsPage: state.albumsPage,
    })
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return ({
        turnOnRedirect: (to: string) => {
            dispatch(createTurnOnRedirect(to))
        },
        handleFormAdd: (albumName: string, directories: FileList, files: FileList) => {
            const concated = Array.from(files).concat(Array.from(directories));
            const r = new DataTransfer()

            for (let i of concated) {
                r.items.add(i)
            }

        },
        handleFormCreate: (albumName: string) => {
            dispatch(createCreateAlbum(albumName))
        },
        handleFormDelete: (ref: React.RefObject<HTMLInputElement>) => {
        },
        getAlbums: () => {
            dispatch(createGetAlbums())
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(Albums)