import React, { Component } from 'react';
import Comp1 from "./components/comp1";
import Comp2 from "./components/comp2";
import Comp3 from "./components/comp3";
import { nama, nim, prodi, mahasiswa } from "./userdata/userdata";
class App extends Component {
	render( ) {
		return (
			<div>
				<table style={{width:'50vw'}}>
					<tr>
						<th>Nama</th>
						<th>Nim</th>
						<th>Prodi</th>
					</tr>
					
					{mahasiswa.map((mhs) => 
						<tr>
							<td>{mhs.nama}</td>
							<td>{mhs.nim}</td>
							<td>{mhs.prodi}</td>
						</tr>
					)}
					</table>
			</div>
		)
	}
}
export default App;