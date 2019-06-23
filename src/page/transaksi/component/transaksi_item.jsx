import React, { Component } from 'react';
import { UANG } from "../../component/func_lib";
import { firebaseRef_TRANSAKSI_ITEM } from '../../../firebase/firebaseRef';
import { Table } from 'semantic-ui-react';
class TransaksiItem extends Component {
	state = {
		item: [ ]
	};
	componentWillMount( ) {
		console.log( this.props.transaksi );
		firebaseRef_TRANSAKSI_ITEM
			.child( this.props.transaksi )
			.once('value', snap => {
				let tmp = [ ];
				snap.forEach(shot => {
					tmp.push({
						...shot.val( )
					})
				});
				this.setState({ item: tmp })
			})
	}
	render( ) {
		const { item } = this.state;
		return ([(
				<Table.Cell key='0'>{item.map(( data, i ) => (
						<p key={i}>{data.id}</p>
					))}</Table.Cell>
			), (
				<Table.Cell key='1'>{item.map(( data, i ) => (
						<p key={i}>{data.nama_barang}</p>
					))}</Table.Cell>
			), (
				<Table.Cell key='2'>{item.map(( data, i ) => (
						<p key={i}>{data.jumlah}</p>
					))}</Table.Cell>
			), (
				<Table.Cell textAlign='right' key='3'>{item.map(( data, i ) => (
						<p key={i}>{UANG( data.harga )}</p>
					))}</Table.Cell>
			)])
	}
}
export default TransaksiItem;