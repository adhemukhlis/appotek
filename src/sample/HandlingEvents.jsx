import React, { Component } from 'react';
class App extends Component {
	state = {
		inputVal: 'oke'
	};
	handleChange = (event ) => {
		this.setState({ inputVal: event.target.value })
	}
	render( ) {
		const { inputVal } = this.state;
		return (
			<div>
				<input type="text" value={inputVal} onChange={this.handleChange}/>
				<button onClick={( ) => alert( this.state.inputVal )}>{this.state.inputVal}</button>
			</div>
		)
	}
}
export default App;