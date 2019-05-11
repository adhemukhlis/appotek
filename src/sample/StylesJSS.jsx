import React, { Component } from 'react';
import Comp1 from "./components/comp1";
import Comp2 from "./components/comp2";
import Comp3 from "./components/comp3";
const color1 = "#00ff00"
const color2 = "#0000ff"
const color3 = "#ff0000"
class App extends Component {
	render( ) {
		return (
			<div>
				<Comp1 nameVal="Januar" style={{
					'background-color': color1
				}}/>
				<Comp2 nameVal="Feby" style={{
					backgroundColor: color2
				}}/>
				<Comp1 tebel={true} nameVal="Meri" style={{
					backgroundColor: color3
				}}/>
				<Comp3 nameVal="Aprilia" style={{
					backgroundColor: color1
				}}/>
				<Comp1 nameVal="Mei" style={{
					backgroundColor: color2
				}}/>
			</div>
		)
	}
}
export default App;