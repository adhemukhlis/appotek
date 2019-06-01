import React, { Component } from 'react';
import { searchArrayTable } from "array-table-search";
import { Header } from 'semantic-ui-react';
import GajiEdit from "./gaji_edit";
import { firebaseRef_GAJI, firebaseRef_CABANG } from "../../../firebase/firebaseRef";
import { PanesHeader, PanelContainer } from '../../style';
import TableGaji from "./gaji_table";
class Operasional extends Component {
	state = {
		gaji: [],
		open: false,
		selected_id: null,
		selected_jabatan: null,
		selected_cabang: null,
		selected_gaji: null,
		search: null,
		new_data: null,
		cabang: [
			{
				id: 'all',
				nama_cabang: 'All'
			}
		]
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
		});
		firebaseRef_CABANG.on('value', snap => {
			let tmp = this.state.cabang;
			snap.forEach(shot => {
				tmp.push({
					id: shot.key,
					...shot.val( )
				})
			});
			this.setState({ cabang: tmp })
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
			this.setState({
				selected_id: null,
				selected_jabatan: null,
				selected_cabang: 'all',
				selected_gaji: null,
				open: true,
				new_data: true
			})
		} else {
			this.setState({
				selected_id: gaji.id,
				selected_jabatan: gaji.jabatan,
				selected_cabang: gaji.cabang,
				selected_gaji: gaji.gaji,
				open: true,
				new_data: false
			})
		}
	};
	render( ) {
		const { gaji, search, cabang, new_data } = this.state;
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( gaji, searchOptionTable );
		return (
			<div style={PanelContainer}>
				<GajiEdit _new_data={new_data} _onSave={this.handleConfirm} _cabang={cabang} handleDropDownChange={this.handleDropDown} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='ID' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_id} _open={this.state.open} _data={{
					id: this.state.selected_id,
					jabatan: this.state.selected_jabatan,
					cabang: this.state.selected_cabang,
					gaji: this.state.selected_gaji
				}}/>
				<Header style={PanesHeader} as='h1'>Gaji</Header>
				<TableGaji _data={searchedTableData} _show={this.show} _search={search} handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default Operasional;