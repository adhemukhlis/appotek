import React, { Component } from 'react';
class App extends Component {
	render( ) {
		return (
			<div style={this.props.style}>
			{
				this.props.tebel
					? <b>Hai{this.props.nameVal}, ini dari Component 1</b>
					: <div>Hai{this.props.nameVal}, ini dari Component 1</div>
			}
			
			
			</div>
		)
	}
}
export default App;