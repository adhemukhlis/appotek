import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
class App extends Component {
	render( ) {
		const panjang = 10,
			lebar = 5;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<p>
						Panjang Persegi :{panjang}<br/>
						Lebar Persegi :{lebar}<br/>
						Luas Persegi :{panjang * lebar}</p>
				</header>
			</div>
		)
	}
}
export default App;