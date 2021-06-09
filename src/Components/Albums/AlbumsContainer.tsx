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
        handleFormAdd: (ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>, ref3: React.RefObject<HTMLInputElement>) => {
            const multiple = ref2.current?.files;
            const directory = ref3.current?.files;

            if (multiple && directory) {
                const files = Array.from(multiple).concat(Array.from(directory));

                let fileList = new DataTransfer()

                for (let i of files) {
                    fileList.items.add(i)
                }
            }
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