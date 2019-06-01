import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { searchArrayTable } from "array-table-search";
import OperasionalEdit from "./operasional_edit";
import TableOperasional from "./operasional_table";
import { PanesHeader, PanelContainer } from '../../style';
import { firebaseRef_OPERASIONAL } from '../../../firebase/firebaseRef';
class Operasional extends Component {
	state = {
		operasional: [],
		selected_id: null,
		selected_pembelian: null,
		selected_qty: null,
		selected_harga: null,
		new_data: null,
		search: null
	};
	componentWillMount( ) {
		firebaseRef_OPERASIONAL.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					id: shot.key,
					...shot.val( )
				})
			});
			this.setState({ operasional: tmp })
		})
	}
	update = ( ) => {
		const content = {
			pembelian: this.state.selected_pembelian,
			qty: this.state.selected_qty,
			harga: this.state.selected_harga
		};
		if ( this.state.new_data ) {
			firebaseRef_OPERASIONAL.push( content )
		} else {
			firebaseRef_OPERASIONAL
				.child( this.state.selected_id )
				.update( content )
				.then(( ) => {
					console.log( "Data saved successfully." )
				})
				.catch(( error ) => {
					console.log( "Data could not be saved." + error )
				})
		}
	}
	delete = ( ) => {
		firebaseRef_OPERASIONAL
			.child( this.state.selected_id )
			.remove( );
		this.close( )
	}
	handleConfirm = ( ) => {
		this.update( );
		this.close( )
	}
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	show = ( data ) => {
		if ( data === "new" ) {
			this.setState({
				selected_id: null,
				selected_pembelian: null,
				selected_qty: null,
				selected_harga: null,
				open: true,
				new_data: true
			})
		} else {
			this.setState({
				selected_id: data.id,
				selected_pembelian: data.pembelian,
				selected_qty: data.qty,
				selected_harga: data.harga,
				open: true,
				new_data: false
			})
		}
	};
	close = ( ) => this.setState({ open: false });
	render( ) {
		const { operasional, search, new_data } = this.state;
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( operasional, searchOptionTable );
		return (
			<div style={PanelContainer}>
				<OperasionalEdit _new_data={new_data} _onSave={this.handleConfirm} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode pembelian' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_pembelian} _open={this.state.open} _data={{
					id: this.state.selected_id,
					pembelian: this.state.selected_pembelian,
					qty: this.state.selected_qty,
					harga: this.state.selected_harga
				}}/>
				<Header style={PanesHeader} as='h1'>Pengeluaran Operasional</Header>
				<TableOperasional _data={searchedTableData} _show={this.show} _search={search} handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default Operasional;