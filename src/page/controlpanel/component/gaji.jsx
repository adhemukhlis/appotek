import React, { Component } from 'react';
import {
	Header
} from 'semantic-ui-react';
import GajiEdit from "./gaji_edit";
import { firebaseRef_GAJI } from "../../../firebase/firebaseRef";
import { PanelHeader, PanelContainer } from '../../style';
import TableGaji from "./gaji_table";
class Operasional extends Component {
	state = {
		gaji: [],
		open: false,
		selected_id: null,
		selected_jabatan: null,
		selected_cabang: null,
		selected_gaji: null
	};
	componentWillMount( ) {
		firebaseRef_GAJI.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					...shot.val( ),
					id: shot.key
				})
			});
			this.setState({ gaji: tmp })
		})
	}
	update = ( ) => {
		const content = {
			cabang: this.state.selected_cabang,
			gaji: this.state.selected_gaji,
			jabatan: this.state.selected_jabatan
		};
		if ( this.state.selected_id !== null ) {
			firebaseRef_GAJI
				.child( this.state.selected_id )
				.update( content )
				.then(( ) => {
					console.log( "Data saved successfully." )
				})
				.catch(( error ) => {
					console.log( "Data could not be saved." + error )
				})
		} else {
			firebaseRef_GAJI.push( content )
		}
	}
	delete = ( ) => {
		firebaseRef_GAJI
			.child( this.state.selected_id )
			.remove( );
		this.close( )
	}
	handleConfirm = ( ) => {
		this.update( );
		this.close( )
	}
	
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	close = ( ) => this.setState({ open: false });
	handleDropDown = (e, { name, value }) => this.setState({ [ name ]: value });
	show = ( gaji ) => {
		if ( gaji === "new" ) {
			this.setState({ selected_id: null, selected_jabatan: null, selected_cabang: null, selected_gaji: null, open: true })
		} else {
			this.setState({ selected_id: gaji.id, selected_jabatan: gaji.jabatan, selected_cabang: gaji.cabang, selected_gaji: gaji.gaji, open: true })
		}
	};
	render( ) {
		const { gaji } = this.state;
		return (
			<div style={PanelContainer}>
				<GajiEdit handleDropDownChange={this.handleDropDown} handleInputChange={this.handleInputChange} _delete={this.delete}_onSave={this.handleConfirm} _placeholder='ID' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_id} _open={this.state.open} _data={{
					id: this.state.selected_id,
					jabatan: this.state.selected_jabatan,
					cabang: this.state.selected_cabang,
					gaji: this.state.selected_gaji
				}}/>
				<Header style={PanelHeader} as='h1'>Gaji</Header>
				<TableGaji _data={gaji} _show={this.show}/>
			</div>
		)	
	}
}
export default Operasional;