import React, { Suspense, Dispatch } from 'react';
import { compose } from "redux"
import { connect } from "react-redux"
import { BrowserRouter, NavLink, Route, Redirect } from "react-router-dom"

//Components ...

import { withAuth } from "./hoc/auth"
import AnimatedLogo from "./Components/AnimatedLogo/AnimatedLogo"
import AccountContainer from "./Components/Account/AccountContainer"
import SignInContainer from "./Components/Auth/SignIn/SignInContainer"
import SignUpContainer from "./Components/Auth/SignUp/SignUpContainer"
import PhotosContainer from "./Components/Media/MediaContainer"
import AlbumsContainer from "./Components/Albums/AlbumsContainer"
import EqualAlbumContainer from "./Components/EqualAlbum/EqualAlbumContainer"

//Style constants ...

import classes from "./constants/App/App.module.css"
import "./constants/Index/index.css"
import { State, Components } from './types';
import { createInitialized } from './redux/app-reducer';
import Preloader from './Components/Preloader/Preloader';


class App extends React.Component<Components.App.AppType> {
	componentDidMount() {
		this.props.initialize()
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}
		return (
			<BrowserRouter>
				<div>
					<nav className={classes["nav-bar"]}>
						<div className={classes["logo"]}>
							<Suspense fallback={null}>
								<AnimatedLogo />
							</Suspense>
						</div>
						<div className={classes["photos"]}>
							<NavLink to="/photos" className="nav-button">Photos</NavLink>
						</div>
						<div className={classes["albums"]}>
							<NavLink to="/albums" className="nav-button">Albums</NavLink>
						</div>
						<div className={classes["account"]}>
							<NavLink to="/account" className="nav-button">Account</NavLink>
						</div>
					</nav>
					<Route exact path="/photos" render={() => <PhotosContainer />} />
					<Route exact path="/albums" render={() => <AlbumsContainer />} />
					<Route exact path="/account/sign_in" render={() => <SignInContainer />} />
					<Route exact path="/account/sign_up" render={() => <SignUpContainer />} />
					<Route exact path="/account" render={() => <AccountContainer />} />
					<Route exact path="/album/:name" component={EqualAlbumContainer} />
					<div className={classes["footer"]}>
						<div className="contact-info">
							<span>Created By <a href="https://github.com/YarikRevich">Yaroslav</a></span>
							<span>All rights are reserved</span>
						</div>
					</div>
					<Redirect exact from="/" to="/photos" />
				</div>
			</BrowserRouter>
		)
	};
}

const mapStateToProps = (props: State) => {
	return {
		initialized: props.app.initialized
	}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		initialize: () => {
			dispatch(createInitialized())
		}
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
