import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
class DropdownCabang extends Component {
	GetName = ( arr, i ) => {
		const result = arr.find( data => data.id === i );
		return result===undefined?'Illegal':result.nama_cabang
	}
	render( ) {
		const { _data, handleDropDownChange, _cabang } = this.props;
		return (
			<Dropdown text={this.GetName( _cabang, _data.cabang )} selection>
				<Dropdown.Menu >{_cabang.map( (data,n) =>< Dropdown.Item key={n} name = 'selected_cabang' onClick = {
						handleDropDownChange
					}
					text = {
						data.nama_cabang
					}
					value = {
						data.id
					} /> )}</Dropdown.Menu>
			</Dropdown>
		)
	}
}
export default DropdownCabang;