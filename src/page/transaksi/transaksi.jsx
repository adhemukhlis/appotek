import React, { Component, createRef } from 'react';
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
import { Redirect } from "react-router-dom";
import Barang from "./component/barang";
import { UANG, SUM, FULLDATE, VALIDATION_PAYMENT_PROCESS } from '../component/func_lib';
import { TransaksiStyle, TransaksiSearchBar } from "../style";
import { multiColumnSearchArrayTable } from "array-table-search";
import {
	firebaseRef_CABANG_BARANG,
	CABANG_BARANG_EDIT,
	firebaseRef_SEARCH,
	firebaseRef_TRANSAKSI,
	firebaseRef_TRANSAKSI_ITEM,
	firebaseRef_CABANG,
	firebaseRef_BARANG,
	rootRefStore
} from '../../firebase/firebaseRef';
class Transaksi extends Component {
	state = {
		modalOpen: false,
		fulldate: null,
		paymentcode: null,
		kasir: null,
		cabang: null,
		cabang_toko: null,
		search: "",
		pembelian: {
			id: [],
			item: [],
			jumlah: [],
			harga: [],
			total: [],
			stok: [ ]
		},
		tunai: "",
		list_barang: [ ]
	};
	inputRef = createRef( );
	handleClick = ( ) => this
		.inputRef
		.current
		.focus( );
	Load = ( ) => {
		firebaseRef_CABANG_BARANG( this.props.userdata.cabang ).on('value', snap => {
			let tmp_barang = [ ];
			snap.forEach(shotdata => {
				firebaseRef_BARANG
					.child( shotdata.key )
					.on('value', data => {
						rootRefStore
							.child( data.val( ).img )
							.getDownloadURL( )
							.then(url => {
								tmp_barang.push({
									...shotdata.val( ),
									...data.val( ),
									img: url
								});
								this.setState({ list_barang: tmp_barang })
							})
					})
			})
		})
	}
	componentDidMount( ) {
		this.Load( );
		firebaseRef_BARANG.on('child_changed', data => {
			this.Load( )
		});
		firebaseRef_CABANG
			.child( this.props.userdata.cabang )
			.child( 'detail_nama_cabang' )
			.on('value', snap => {
				this.setState({
					cabang_toko: snap.val( )
				})
			});
		firebaseRef_SEARCH
			.child( this.props.userdata.nik )
			.update({ search: '' });
		firebaseRef_SEARCH
			.child( this.props.userdata.nik )
			.on('value', snap => {
				this.setState({
					search: snap
						.val( )
						.search
				});
				console.log( snap.val( ).search )
			})
	}
	UpdateData = ( index ) => {
		const content = {
			id: this.state.pembelian.id[index],
			harga: this.state.pembelian.harga[index],
			stok: this.state.pembelian.stok[index] - this.state.pembelian.jumlah[index]
		};
		firebaseRef_TRANSAKSI_ITEM
			.child( this.state.paymentcode )
			.child( content.id )
			.set({id: this.state.pembelian.id[index], nama_barang: this.state.pembelian.item[index], harga: this.state.pembelian.harga[index], jumlah: this.state.pembelian.jumlah[index], total: this.state.pembelian.total[index]});
		CABANG_BARANG_EDIT( content.id, this.props.userdata.cabang, content )
	}
	addToCart = ( item ) => {
		console.log( item.id );
		console.log(this.state.pembelian.id.includes( item.id ));
		let TMP_cart = this.state.pembelian;
		if (this.state.pembelian.id.includes( item.id )) {
			console.log(this.state.pembelian.id.indexOf( item.id ));
			let tmp_jumlah = this.state.pembelian.jumlah;
			let tmp_total = this.state.pembelian.total;
			const index = this
				.state
				.pembelian
				.id
				.indexOf( item.id );
			tmp_total[index] = tmp_total[index] + item.total;
			tmp_jumlah[index] = tmp_jumlah[index] + item.jumlah;
			console.log( tmp_total );
			console.log( tmp_jumlah )
		} else {
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
				.push( item.total )
		}
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
		this.setState({ pembelian: tmp_pembelian });
		this.handleClick( )
	}
	open = ( ) => {
		const date = new Date( ).getTime( );
		const paycode = firebaseRef_TRANSAKSI
			.push( )
			.key;
		this.setState({ fulldate: date, paymentcode: paycode, modalOpen: true })
	}
	inputTunai = (e, { value }) => this.setState({ tunai: value });
	shortHand = ( Value ) => {
		this.setState({
			tunai: this.state.tunai + Value
		})
	}
	handleClose = ( ) => this.setState({ modalOpen: false });
	clear = ( ) => {
		const clr_pembelian = {
			id: [],
			item: [],
			jumlah: [],
			harga: [],
			total: [],
			stok: [ ]
		};
		this.setState({ tunai: "", pembelian: clr_pembelian })
	}
	payproc = ( ) => {
		const total = SUM( this.state.pembelian.total );
		const tunai = parseInt( this.state.tunai );
		const payment = {
			paymentcode: this.state.paymentcode,
			kasir: this.props.userdata.nik,
			cabang: this.props.userdata.cabang,
			cabang_toko: this.state.cabang_toko,
			tunai: tunai,
			total: total,
			kembali: tunai - total,
			datetime: this.state.fulldate
		};
		console.log( payment );
		this
			.state
			.pembelian
			.id
			.map(( data, i ) => this.UpdateData( i ));
		firebaseRef_TRANSAKSI
			.child( payment.paymentcode )
			.set( payment );
		this.handleClose( );
		this.clear( )
	}
	handleInputChange = (e, { name, value }) => this.setState({ [ name ]: value });
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const { tunai, list_barang, search } = this.state;
		const searchOptionTable = {
			id: {
				type: 'includes',
				value: search
			}
		};
		const searchedTableData = multiColumnSearchArrayTable( list_barang, searchOptionTable );
		return (
			<div style={TransaksiStyle}>
				<div style={TransaksiSearchBar}>
					<Button as='a' icon='photo' href="/#/scanner"/>
					<Input icon='search' value={search} name='search' onChange={this.handleInputChange} placeholder='ID'/>
				</div>
				<div style={{
					marginBottom: '100px'
				}}>
					<Modal open={this.state.modalOpen} onClose={this.handleClose} onMount={this.handleClick} trigger={(
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
											<Table.HeaderCell>Cabang</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.state.cabang_toko}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Kode Transaksi</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.state.paymentcode}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>NIK Kasir</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{this.props.userdata.nik}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Waktu</Table.HeaderCell>
											<Table.HeaderCell colSpan='4'>{FULLDATE( this.state.fulldate )}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell textAlign='center'>Pembelian</Table.HeaderCell>
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
												<Table.Row key={i}>
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
												<Input fluid placeholder='Tunai' ref={this.inputRef} value={tunai} onChange={this.inputTunai} label={{
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
							<Button disabled={VALIDATION_PAYMENT_PROCESS(tunai, SUM( this.state.pembelian.total ))} primary onClick={( ) => this.payproc( )}>
								Proceed
								<Icon name='chevron right'/>
							</Button>
						</Modal.Actions>
					</Modal>
				</div>
				<Container>
					<Card.Group itemsPerRow={4}>{searchedTableData.map(( val, i ) => ( <Barang addToCart={this.addToCart} key={i} barang={val}/> ))}</Card.Group>
				</Container>
			</div>
		)
	}
}
export default Transaksi;