import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import BaseLayout from "./base";
class App extends Component {
	render( ) {
		return (
			<HashRouter>
				<BaseLayout/>
			</HashRouter>
		)
	}
}
export default App;