import React, { Component } from 'react';
import { searchArrayTable } from "array-table-search";
import { CABANG_BARANG_ADD, CABANG_BARANG_EDIT, CABANG_BARANG_DELETE } from "../../../../firebase/firebaseRef";
import { Header } from 'semantic-ui-react';
import DataBarangEdit from "./data_barang_cabang_edit";
import TableDataBarang from "./data_barang_cabang_table";
import { PanelContainer, PanesHeader } from '../../../style';
class DataBarangCabang extends Component {
	state = {
		barang: [],
		selected_id: null,
		selected_nama_barang: null,
		selected_desc: null,
		selected_img: null,
		search: null,
		new_data: null
	};
	update = ( ) => {
		const content = {
			stok: parseInt( this.state.selected_stok ),
			harga: parseInt( this.state.selected_harga )
		};
		if ( this.state.new_data ) {
			CABANG_BARANG_ADD( this.state.selected_id, this.props.id_cabang, content )
		} else {
			CABANG_BARANG_EDIT( this.state.selected_id, this.props.id_cabang, content )
		}
	}
	delete = ( ) => {
		CABANG_BARANG_DELETE( this.state.selected_id, this.props.id_cabang );
		this.close( )
	}
	handleConfirm = ( ) => {
		this.update( );
		this.close( )
	}
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	handleDropDown = (e, { name, value }) => this.setState({ selected_id: value });
	show = ( data ) => {
		if ( data === "new" ) {
			this.setState({
				selected_id: null,
				selected_nama_barang: null,
				selected_stok: '',
				selected_harga: '',
				open: true,
				new_data: true
			})
		} else {
			this.setState({
				selected_id: data.id,
				selected_nama_barang: data.nama_barang,
				selected_stok: data.stok,
				selected_harga: data.harga,
				open: true,
				new_data: false
			})
		}
	};
	close = ( ) => this.setState({ open: false });
	render( ) {
		const { nama_cabang, data_barang } = this.props;
		const { search, new_data } = this.state;
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( data_barang, searchOptionTable );
		return (
			<div style={PanelContainer}>
				<DataBarangEdit _new_data={new_data} _onSave={this.handleConfirm} handleDropDown={this.handleDropDown} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode barang' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_nama_barang} _open={this.state.open} _data={{
					id: this.state.selected_id,
					nama_barang: this.state.selected_nama_barang,
					stok: this.state.selected_stok,
					harga: this.state.selected_harga
				}}/>
				<Header style={PanesHeader} as='h1'>{'Data Stok Barang Cabang ' + nama_cabang}</Header>
				<TableDataBarang _data={searchedTableData} _show={this.show} _search={search} handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default DataBarangCabang;