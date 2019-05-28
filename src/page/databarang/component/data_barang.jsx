import React, { Component } from 'react';
import { searchArrayTable, multiColumnSearchArrayTable } from "array-table-search";
import { firebaseRef_BARANG } from "../../../firebase/firebaseRef";
import { Header } from 'semantic-ui-react';
import DataBarangEdit from "./data_barang_edit";
import TableDataBarang from "./data_barang_table";
import { PanelContainer, PanelHeader } from '../../style';
class DataBarang extends Component {
	state = {
		barang: [],
		selected_id: null,
		selected_nama_barang: null,
		selected_desc: null,
		selected_img: null,
		confirm: null,
		search: null,
		new_data: null,
		new_id: ''
	};
	componentWillMount( ) {
		firebaseRef_BARANG.on('value', snap => {
			let tmp = [ ];
			snap.forEach(shot => {
				tmp.push({
					...shot.val( )
				})
			});
			this.setState({ barang: tmp })
		})
	}
	update = ( ) => {
		const content = {
			nama_barang: this.state.selected_nama_barang,
			img: this.state.selected_img,
			desc: this.state.selected_desc
		};
		if ( this.state.new_data ) {
			firebaseRef_BARANG
				.child( this.state.new_id )
				.set({
					id: this.state.new_id,
					...content
				})
		} else {
			firebaseRef_BARANG
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
		firebaseRef_BARANG
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
				selected_nama_barang: null,
				selected_desc: null,
				selected_img: null,
				open: true,
				new_data: true
			})
		} else {
			this.setState({
				selected_id: data.id,
				selected_nama_barang: data.nama_barang,
				selected_desc: data.desc,
				selected_img: data.img,
				open: true,
				new_data: false
			})
		}
	};
	close = ( ) => this.setState({ open: false });
	render( ) {
		const { barang, search, new_data, new_id } = this.state;
		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( barang, searchOptionTable );
		const searchOptionMultiColumn = {
			id: {
				type: 'exact',
				value: new_id
			}
		};
		const ExistID = multiColumnSearchArrayTable( barang, searchOptionMultiColumn );
		const Validation1 = !( ExistID.length < 1 );
		console.log( ExistID );
		return (
			<div style={PanelContainer}>
				<DataBarangEdit _validation={new_data
					? Validation1
					: false} _exist_ID={ExistID} _new_data={new_data} _onSave={this.handleConfirm} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode barang' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_nama_barang} _open={this.state.open} _data={{
					id: this.state.selected_id,
					nama_barang: this.state.selected_nama_barang,
					desc: this.state.selected_desc,
					img: this.state.selected_img
				}}/>
				<Header style={PanelHeader} as='h1'>Data Barang</Header>{} < TableDataBarang _data = {
				searchedTableData}
				_show={this.show}
				_search={search}
				handleInputChange={this.handleInputChange}/>
			</div>
		)
	}
}
export default DataBarang;