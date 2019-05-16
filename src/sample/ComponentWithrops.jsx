import React, { Component } from 'react';
import Comp1 from "./components/comp1";
import Comp2 from "./components/comp2";
import Comp3 from "./components/comp3";
import { nama, nim, prodi, mahasiswa } from "./userdata/userdata";
import { firebaseRef_GAJI } from '../firebase/firebaseRef';
class App extends Component {
	push = ( ) => {
		const content = {
			data1: null,
			data2: null,
			data3: null
		};
		firebaseRef.push( content )
	}
	componentWillMount( ) {
		firebaseRef.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					...shot.val( )
				})
			});
			this.setState({ master: tmp })
		})
	}
	checking = ( info ) => {
		firebaseRef_CHILD( info ).once('value', snapshot => {
			if (snapshot.exists( )) {} else {}
		})
	}
	callback = ( ) => {
		firebaseRef_CHILD.set({
			data1: null,
			data2: null,
			data3: null
		}, ( error ) => {
			if ( error ) {} else {}
		})
	}
	promise = ( ) => {
		const content = {
			data1: null,
			data2: null,
			data3: null
		};
		firebaseRef
			.update( content )
			.then(( ) => {
				console.log( "Data saved successfully." )
			})
			.catch(( error ) => {
				console.log( "Data could not be saved." + error )
			})
	}
	render( ) {
		return (
			<div>
				<table style={{
					width: '50vw'
				}}>
					<tr>
						<th>Nama</th>
						<th>Nim</th>
						<th>Prodi</th>
					</tr>{mahasiswa.map(( mhs ) =>< tr > <td>{mhs.nama}</td> < td > {
						mhs.nim
					} < /td><td>{mhs.prodi}</td > </tr>)}</table>
			</div>
		)
	}
};
export default App;