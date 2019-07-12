import React, { Component } from 'react';
import { searchArrayTable } from "array-table-search";
// import { CABANG_BARANG_ADD, CABANG_BARANG_EDIT, CABANG_BARANG_DELETE } from "../../../firebase/firebaseRef";
import { Header } from 'semantic-ui-react';
// import DataBarangEdit from "./data_barang_cabang_edit";
import TableDataTransaksi from "./data_transaksi_cabang_table";
import { PanelContainer, PanesHeader } from '../../style';
class DataTransaksiCabang extends Component {
	state = {
		barang: [],
		search: ""
	};
	// update = ( ) => {
	// 	const content = {
	// 		stok: parseInt( this.state.selected_stok ),
	// 		harga: parseInt( this.state.selected_harga )
	// 	};
	// 	if ( this.state.new_data ) {
	// 		CABANG_BARANG_ADD( this.state.selected_id, this.props.id_cabang, content )
	// 	} else {
	// 		CABANG_BARANG_EDIT( this.state.selected_id, this.props.id_cabang, content )
	// 	}
	// }
	// delete = ( ) => {
	// 	CABANG_BARANG_DELETE( this.state.selected_id, this.props.id_cabang );
	// 	this.close( )
	// }
	// handleConfirm = ( ) => {
	// 	this.update( );
	// 	this.close( )
	// }
	// handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	// handleDropDown = (e, { name, value }) => this.setState({ selected_id: value });
	// show = ( data ) => {
	// 	if ( data === "new" ) {
	// 		this.setState({
	// 			selected_id: null,
	// 			selected_nama_barang: null,
	// 			selected_stok: null,
	// 			selected_harga: null,
	// 			open: true,
	// 			new_data: true
	// 		})
	// 	} else {
	// 		this.setState({
	// 			selected_id: data.id,
	// 			selected_nama_barang: data.nama_barang,
	// 			selected_stok: data.stok,
	// 			selected_harga: data.harga,
	// 			open: true,
	// 			new_data: false
	// 		})
	// 	}
	// };
	// close = ( ) => this.setState({ open: false });
	render( ) {
		const { nama_cabang, data_barang, handleDropDown,handleInputChange, _applyfilter, _tahun } = this.props;
		const { search } = this.state;
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( data_barang, searchOptionTable );
		return (
			<div style={PanelContainer}>
				{/* <DataBarangEdit _new_data={new_data} _onSave={this.handleConfirm} handleDropDown={this.handleDropDown} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode barang' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_nama_barang} _open={this.state.open} _data={{
					id: this.state.selected_id,
					nama_barang: this.state.selected_nama_barang,
					stok: this.state.selected_stok,
					harga: this.state.selected_harga
				}}/> */}
				<Header style={PanesHeader} as='h1'>{'Data Transaksi Cabang ' + nama_cabang}</Header>
				<TableDataTransaksi _data={searchedTableData} _search={search} handleInputChange={this.handleInputChange} handleYearFilterChange={handleInputChange} handleDropDownChange={handleDropDown}_tahun={_tahun} _applyfilter={_applyfilter} />
			</div>
		)
	}
}
export default DataTransaksiCabang;