import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Loader from "../page/loader/loader";
import BaseLayout from "./base";
class App extends Component {
	state = {
		loaded: false
	};
	componentDidMount( ) {
		setTimeout( ( ) => {
			this.setState({ loaded: true })
		}, 3000 )
	}
	render( ) {
		const { loaded } = this.state;
		return (
			<HashRouter>{loaded
					? <BaseLayout/>
					: <Loader/>}</HashRouter>
		)
	}
}
export default App;