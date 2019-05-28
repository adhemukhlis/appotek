import React, { Component } from 'react';
import { firebaseRef_BARANG } from '../../../firebase/firebaseRef';
import { Dropdown } from 'semantic-ui-react';
class DropdownID extends Component {
        state = {
                options:[]
        }
	componentWillMount( ) {
		firebaseRef_BARANG.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					key: shot.val().id, value: shot.val().id, text: '#'+shot.val().id+' - '+shot.val().nama_barang
				})
			});
			this.setState({ options: tmp })
		})
        }
       
	render( ) {
                const {options} = this.state
		return ( <Dropdown onChange={this.props.handleDropDown} placeholder='Pilih barang' fluid search selection options={options}/> )
	}
}
export default DropdownID;