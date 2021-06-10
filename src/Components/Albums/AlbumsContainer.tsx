import React, { Dispatch } from "react";
import { compose } from "redux"
import { connect } from "react-redux";
import { withAuth } from "./../../hoc/auth"
import { Albums } from "./Albums"
import { createGetAlbums } from "../../redux/albums-reducer";


const mapStateToProps = (state: any) => {
    return ({
        albumsPage: state.albumsPage,
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
            console.log(concated)
        },
        handleFormCreate: (ref: React.RefObject<HTMLInputElement>) => {
        },
        handleFormDelete: (ref: React.RefObject<HTMLInputElement>) => {
        },
        getAlbums: () => {
            dispatch(createGetAlbums())
        }
    })
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(Albums)