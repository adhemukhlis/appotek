import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { searchArrayTable } from "array-table-search";
import PengeluaranEdit from "./pengeluaran_edit";
import TablePengeluaran from "./pengeluaran_table";
import { PanesHeader, PanelContainer } from '../../style';
import { firebaseRef_PENGELUARAN, TIMESTAMP } from '../../../firebase/firebaseRef';
import {  ShortDate } from '../../component/func_lib';
class Pengeluaran extends Component {
	state = {
		operasional: [],
		selected_id: null,
		selected_pembelian: null,
		selected_jenis_pembelian:null,
		selected_qty: null,
		selected_harga: null,
		selected_cabang: null,
		selected_satuan: null,

		new_data: null,
		search: null
	};
	// componentDidMount(){
	// 	const content = {
	// 		pembelian: 'listrik',
	// 		datetime:TIMESTAMP,
	// 		jenis_pembelian:'operasional',
	// 		satuan:'thn',
	// 		cabang:'jkt',
	// 		qty: 1,
	// 		harga: 500000
	// 	};
	// 	firebaseRef_PENGELUARAN.push( content )
	// }
	componentWillMount( ) {
		
		firebaseRef_PENGELUARAN.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					id: shot.key,
					...shot.val( )
				})
				console.log(ShortDate(shot.val().datetime))
			});
			this.setState({ operasional: tmp })
		})
	}
	update = ( ) => {
		const content = {
			pembelian: this.state.selected_pembelian,
			jenis_pembelian:this.state.selected_jenis_pembelian,
			satuan:this.state.selected_satuan,
			cabang:this.state.selected_cabang,
			datetime:TIMESTAMP,
			qty: this.state.selected_qty,
			harga: this.state.selected_harga
		};
		if ( this.state.new_data ) {
			firebaseRef_PENGELUARAN.push( content )
		} else {
			firebaseRef_PENGELUARAN
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
		firebaseRef_PENGELUARAN
			.child( this.state.selected_id )
			.remove( );
		this.close( )
	}
	handleConfirm = ( ) => {
		this.update( );
		this.close( )
	}
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	handleDropDown = (e, { name, value }) => this.setState({ [ name ]: value });
	show = ( data ) => {
		if ( data === "new" ) {
			this.setState({
				selected_id: null,
				selected_pembelian: null,
				selected_qty: null,
				selected_harga: null,
				selected_jenis_pembelian: null,
				selected_cabang:data.cabang,
				selected_satuan:data.satuan,
				open: true,
				new_data: true
			})
		} else {
			this.setState({
				selected_id: data.id,
				selected_pembelian: data.pembelian,
				selected_qty: data.qty,
				selected_harga: data.harga,
				selected_jenis_pembelian: data.jenis_pembelian,
				selected_cabang:data.cabang,
				selected_satuan:data.satuan,
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
				<PengeluaranEdit handleDropDownChange={this.handleDropDown}  _new_data={new_data} _onSave={this.handleConfirm} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode pembelian' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_pembelian} _open={this.state.open} _data={{
					id: this.state.selected_id,
					pembelian: this.state.selected_pembelian,
					qty: this.state.selected_qty,
					harga: this.state.selected_harga,
					jenis_pembelian:this.state.selected_jenis_pembelian,
					cabang:this.state.selected_cabang,
					satuan:this.state.selected_satuan
				}}/>
				<Header style={PanesHeader} as='h1'>Data Pengeluaran</Header>
				<TablePengeluaran _data={searchedTableData} _show={this.show} _search={search} handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default Pengeluaran;