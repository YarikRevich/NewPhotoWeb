import { connect } from "react-redux"
import type { State } from "../../types"
import MediaOrderer from "./MediaOrderer"

const mapStateToProps = (state: State) => {
    return {
        photoPage: state.photoPage,
        videoPage: state.videoPage,
        albumsPage: state.albumsPage,
    }
}

const mapDispatchToProps = () => {
    return {
        getFullPhoto: (thumbnail: string) => {}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaOrderer)