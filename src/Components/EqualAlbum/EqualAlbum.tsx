import React, { useEffect } from "react";
import type { Components } from "./../../types"
import MediaOrderer from "./../MediaOrderer/MediaOrderer"

export const EqualAlbum = (props: Components.EqualAlbum.EqualAlbumType) => {

    useEffect(() => {
        props.getEqualAlbumPhotos(props.name)
    }, [])

    return <></>
}