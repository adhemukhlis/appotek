import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { searchArrayTable } from "array-table-search";
import PengeluaranEdit from "./pengeluaran_edit";
import TablePengeluaran from "./pengeluaran_table";
import { PanesHeader, PanelContainer } from '../../style';
import { firebaseRef_PENGELUARAN, TIMESTAMP, PENGELUARAN_ADD, PENGELUARAN_EDIT, PENGELUARAN_DELETE } from '../../../firebase/firebaseRef';
import { ShortDate } from '../../component/func_lib';
class Pengeluaran extends Component {
	state = {
		operasional: [],
		selected_id: null,
		selected_pembelian: null,
		selected_jenis_pembelian: null,
		selected_qty: null,
		selected_harga: null,
		selected_cabang: null,
		selected_satuan: null,
		new_data: null,
		search: ""
	};
	componentWillMount( ) {
		firebaseRef_PENGELUARAN.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					id: shot.key,
					...shot.val( )
				});
				console.log(ShortDate( shot.val( ).datetime ))
			});
			this.setState({ operasional: tmp })
		})
	}
	update = ( ) => {
		const content = {
			pembelian: this.state.selected_pembelian,
			jenis_pembelian: this.state.selected_jenis_pembelian,
			satuan: this.state.selected_satuan,
			cabang: this.state.selected_cabang,
			datetime: TIMESTAMP,
			qty: parseInt(this.state.selected_qty),
			harga: parseInt(this.state.selected_harga)
		};
		if ( this.state.new_data ) {
			PENGELUARAN_ADD( content )
		} else {
			PENGELUARAN_EDIT( this.state.selected_id, content )
		}
	}
	delete = ( ) => {
		PENGELUARAN_DELETE( this.state.selected_id );
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
				selected_pembelian: '',
				selected_qty: '',
				selected_harga: '',
				selected_jenis_pembelian: '',
				selected_cabang: data.cabang,
				selected_satuan: data.satuan,
				open: true,
				new_data: true
			})
		} else {
			this.setState({
				selected_id: data.id,
				selected_pembelian: data.pembelian,
				selected_qty: parseInt,
				selected_harga: data.harga,
				selected_jenis_pembelian: data.jenis_pembelian,
				selected_cabang: data.cabang,
				selected_satuan: data.satuan,
				open: true,
				new_data: false
			})
		}
	};
	close = ( ) => this.setState({ open: false });
	render( ) {
		const { operasional, search, new_data } = this.state;
		const { validation_kc} =this.props
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( operasional, searchOptionTable );
		return (
			<div style={PanelContainer}>
				<PengeluaranEdit _validation_kc={validation_kc} handleDropDownChange={this.handleDropDown} _new_data={new_data} _onSave={this.handleConfirm} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode pembelian' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_pembelian} _open={this.state.open} _data={{
					id: this.state.selected_id,
					pembelian: this.state.selected_pembelian,
					qty: this.state.selected_qty,
					harga: this.state.selected_harga,
					jenis_pembelian: this.state.selected_jenis_pembelian,
					cabang: this.state.selected_cabang,
					satuan: this.state.selected_satuan
				}}/>
				<Header style={PanesHeader} as='h1'>Data Pengeluaran</Header>
				<TablePengeluaran _data={searchedTableData} _show={this.show} _search={search} handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default Pengeluaran;