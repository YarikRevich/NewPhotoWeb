import { Dispatch } from "react"
import { connect } from "react-redux"
import type { State } from "../../types"
import DetailedView from "./DetailedView"

const mapStateToProps = (state: State) => {
    return {

    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView)