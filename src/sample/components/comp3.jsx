import React, { Component } from 'react';
class App extends Component {
	render( ) {
		return (
			<div style={this.props.style}>
				Hai{this.props.nameVal}, ini dari Component 3
			</div>
		)
	}
}
export default App;