import React, { Component } from 'react';
import "./loader.scss";
class Loader extends Component {
	render( ) {
		return (
			<div className="contain">
				<div className="preload-2">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		)
	}
}
export default Loader;