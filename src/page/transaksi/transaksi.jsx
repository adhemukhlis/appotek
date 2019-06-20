import React, { Component } from 'react';
import {
	Input,
	Card,
	Container,
	Button,
	Label,
	Icon,
	Modal,
	Table
} from "semantic-ui-react";
import Scanner from "../scanner/scanner";
import { Redirect } from "react-router-dom";
import Barang from "./component/barang";
import { UANG, SUM, FULLDATE } from '../component/func_lib';
import { TransaksiStyle, TransaksiSearchBar } from "../style";
import {searchArrayTable} from "array-table-search";
import { firebaseRef_CABANG_BARANG, CABANG_BARANG_EDIT, firebaseRef_SEARCH } from '../../firebase/firebaseRef';
class Transaksi extends Component {
	state = {
		fulldate: null,
		paymentcode: 'xtadaaslgetaacx-v',
		kasir: 'mukhlis',
		cabang: 'purwokerto',
		search:"",
		pembelian: {
			id: [],
			item: [],
			jumlah: [],
			harga: [],
			total: [],
			stok: [ ]
		},
		tunai: 0,
		list_barang: [ ]
	};
	componentDidMount( ) {
		firebaseRef_SEARCH.child('105341420100523661792').on('value', snap => {
			
			this.setState({ search: snap.val().search })
			console.log(snap.val().search);
		})
		firebaseRef_CABANG_BARANG( this.props.userdata.cabang ).on('value', snap => {
			let tmp_barang = [ ];
			snap.forEach(shotdata => {
				tmp_barang.push({
					id: shotdata.key,
					...shotdata.val( )
				})
			});
			this.setState({ list_barang: tmp_barang })
		})
	}
	UpdateData = ( index ) => {
		const content = {
			id: this.state.pembelian.id[index],
			harga: this.state.pembelian.harga[index],
			stok: this.state.pembelian.stok[index] - this.state.pembelian.jumlah[index]
		};
		CABANG_BARANG_EDIT( content.id, this.props.userdata.cabang, content )
	}
	addToCart = ( item ) => {
		console.log( item.id );
		let TMP_cart = this.state.pembelian;
		TMP_cart
			.id
			.push( item.id );
		TMP_cart
			.item
			.push( item.item );
		TMP_cart
			.jumlah
			.push( item.jumlah );
		TMP_cart
			.harga
			.push( item.harga );
		TMP_cart
			.stok
			.push( item.stok );
		TMP_cart
			.total
			.push( item.total );
		this.setState({ pembelian: TMP_cart })
	}
	deleteFunc = ( index, arr ) => {
		let array = arr;
		if ( index !== -1 ) {
			array.splice( index, 1 )
		}
		return array
	}
	deleteItem = ( index ) => {
		const pembelian = this.state.pembelian;
		const tmp_pembelian = {
			id: this.deleteFunc( index, pembelian.id ),
			item: this.deleteFunc( index, pembelian.item ),
			jumlah: this.deleteFunc( index, pembelian.jumlah ),
			harga: this.deleteFunc( index, pembelian.harga ),
			stok: this.deleteFunc( index, pembelian.stok ),
			total: this.deleteFunc( index, pembelian.total )
		};
		this.setState({ pembelian: tmp_pembelian })
	}
	open = ( ) => {
		this.setState({fulldate: FULLDATE( )})
	}
	inputTunai = (e, { value }) => this.setState({ tunai: value });
	shortHand = ( Value ) => {
		this.setState({
			tunai: this.state.tunai + Value
		})
	}
	payproc = ( ) => {
		const payment = {
			paymentcode: this.state.paymentcode,
			kasir: this.state.kasir,
			cabang: this.state.cabang,
			tunai: this.state.tunai,
			...this.state.pembelian
		};
		console.log( payment );
		this
			.state
			.pembelian
			.id
			.map(( data, i ) => this.UpdateData( i ))
	}
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });

	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const { tunai, list_barang, search } = this.state;


		const searchOptionTable = {
			type: 'includes',
			value: search
		};
		const searchedTableData = searchArrayTable( list_barang, searchOptionTable );

		return (
			<div style={TransaksiStyle}>
				<div style={TransaksiSearchBar}>
					<Input icon='search' value={search} name='search'onChange={this.handleInputChange} placeholder='ID'/>
					<Scanner/>
				</div>
				<div style={{
					marginBottom: '100px'
				}}>
					<Modal trigger={(
						<Button as='div' labelPosition='left' onClick={( ) => this.open( )}>
							<Label as='a' basic pointing='right'>
								{UANG(SUM( this.state.pembelian.total ))}
							</Label>
							<Button icon positive>
								<Icon name='check circle'/>
								Bayar
							</Button>
						</Button>
					)}>
						<Modal.Header>Pembayaran</Modal.Header>
						<Modal.Content image scrolling>
							<Modal.Description>
								<Table celled>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Kode Transaksi</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.state.paymentcode}-v</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Kasir</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.state.kasir}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Cabang</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.state.cabang}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Date Time</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.state.fulldate}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell textAlign='center'>Barang</Table.HeaderCell>
											<Table.HeaderCell textAlign='center'>QTY</Table.HeaderCell>
											<Table.HeaderCell textAlign='center'>Harga</Table.HeaderCell>
											<Table.HeaderCell textAlign='center'>Total</Table.HeaderCell>
											<Table.HeaderCell textAlign='center' collapsing><Icon name='settings'/></Table.HeaderCell>
										</Table.Row>
									</Table.Header>
									<Table.Body>{this
											.state
											.pembelian
											.item
											.map(( item, i ) => (
												<Table.Row>
													<Table.Cell>{this.state.pembelian.item[i]}</Table.Cell>
													<Table.Cell>{this.state.pembelian.jumlah[i]}</Table.Cell>
													<Table.Cell textAlign='right'>{UANG(this.state.pembelian.harga[i])}</Table.Cell>
													<Table.Cell textAlign='right'>{UANG(this.state.pembelian.total[i])}</Table.Cell>
													<Table.Cell>
														<Button icon onClick={( ) => this.deleteItem( i )}>
															<Icon name='trash alternate outline'/>
														</Button>
													</Table.Cell>
												</Table.Row>
											))}
										<Table.Row >
											<Table.Cell active>Total Bayar</Table.Cell>
											<Table.Cell textAlign='right' active colSpan='4'>{UANG(SUM( this.state.pembelian.total ))}</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell active>Tunai</Table.Cell>
											<Table.Cell textAlign='right' active colSpan='4'>
												<Input fluid placeholder='Tunai' name='selected_gaji' value={tunai} onChange={this.inputTunai} label={{
													tag: true,
													content: UANG( tunai )
												}} labelPosition='right'/>
											</Table.Cell>
										</Table.Row>
										<Table.Row warning>
											<Table.Cell >Kembalian</Table.Cell>
											<Table.Cell textAlign='right' colSpan='4'>{UANG(tunai - SUM( this.state.pembelian.total ))}</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</Modal.Description>
						</Modal.Content>
						<Modal.Actions>
							<Button primary onClick={( ) => this.payproc( )}>
								Proceed
								<Icon name='chevron right'/>
							</Button>
						</Modal.Actions>
					</Modal>
				</div>
				<Container>
					<Card.Group itemsPerRow={4}>{searchedTableData.map(val => ( <Barang addToCart={this.addToCart} barang={val}/> ))}</Card.Group>
				</Container>
			</div>
		)
	}
}
export default Transaksi;