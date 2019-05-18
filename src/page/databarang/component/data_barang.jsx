import React, { Component } from 'react';
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
		confirm: null
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
	show = ( data ) => this.setState({ selected_id: data.id, selected_nama_barang: data.nama_barang, selected_desc: data.desc, selected_img: data.img, open: true });
	close = ( ) => this.setState({ open: false });
	render( ) {
		const { barang } = this.state;
		return (
			<div style={PanelContainer}>
				<DataBarangEdit _onSave={this.handleConfirm} handleInputChange={this.handleInputChange} _delete={this.delete} _placeholder='kode barang' _close={this.close} _keydelete={this.state.selected_id} _headername={this.state.selected_nama_barang} _open={this.state.open} _data={{
					id: this.state.selected_id,
					nama_barang: this.state.selected_nama_barang,
					desc: this.state.selected_desc,
					img: this.state.selected_img
				}}/>
				<Header style={PanelHeader} as='h1'>Data Barang</Header>
				<TableDataBarang _data={barang} _show={this.show}/>
			</div>
		)
	}
}
export default DataBarang;