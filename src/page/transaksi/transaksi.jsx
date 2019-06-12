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
import { Redirect } from "react-router-dom";
import Barang from "./component/barang";
import { barang } from "./component/data_barang";
import ShortHandButtons from "./component/shorthand_btn";
import { UANG, SUM, FULLDATE } from '../component/func_lib';
import { TransaksiStyle, TransaksiSearchBar } from "../style";
import { firebaseRef_CABANG_BARANG, firebaseRef_BARANG } from '../../firebase/firebaseRef';
class Transaksi extends Component {
	state = {
		fulldate: null,
		paymentcode: 'xtadaaslgetaacx-v',
		kasir: 'mukhlis',
		cabang: 'purwokerto',
		pembelian: {
			item: [],
			jumlah: [],
			harga: [],
			total: [ ]
		},
		tunai: 0,
		list_barang: [],
		list_barang2: barang
	};
	componentDidMount( ) {
		firebaseRef_CABANG_BARANG( this.props.userdata.cabang ).on('value', snap => {
			let tmp_barang = this.state.list_barang;
			snap.forEach(shotdata => {
				tmp_barang.push({
					id: shotdata.key,
					...shotdata.val( )
				})
			});
			this.setState({ list_barang: tmp_barang })
		})
	}
	addToCart = ( item ) => {
		let TMP_cart = this.state.pembelian;
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
			.total
			.push( item.total );
		this.setState({ pembelian: TMP_cart })
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
		console.log( payment )
	}
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		const { tunai, list_barang, list_barang2 } = this.state;
		return (
			<div style={TransaksiStyle}>
				<div style={TransaksiSearchBar}>
					<Input icon='search' placeholder='Search..'/>
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
								<Input value={tunai} onChange={this.inputTunai} type='text' placeholder='Tunai'/>
								<ShortHandButtons onbtnClick={this.shortHand}/>
								<Table celled>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>Kode Transaksi</Table.HeaderCell>
											<Table.HeaderCell colSpan='3'>{this.state.paymentcode}-v</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Kasir</Table.HeaderCell>
											<Table.HeaderCell colSpan='3'>{this.state.kasir}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Cabang</Table.HeaderCell>
											<Table.HeaderCell colSpan='3'>{this.state.cabang}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Date Time</Table.HeaderCell>
											<Table.HeaderCell colSpan='3'>{this.state.fulldate}</Table.HeaderCell>
										</Table.Row>
										<Table.Row>
											<Table.HeaderCell>Barang</Table.HeaderCell>
											<Table.HeaderCell>QTY</Table.HeaderCell>
											<Table.HeaderCell>Harga</Table.HeaderCell>
											<Table.HeaderCell>Total</Table.HeaderCell>
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
												</Table.Row>
											))}
										<Table.Row >
											<Table.Cell active>Total Bayar</Table.Cell>
											<Table.Cell textAlign='right' active colSpan='3'>{UANG(SUM( this.state.pembelian.total ))}</Table.Cell>
										</Table.Row>
										<Table.Row>
											<Table.Cell active>Tunai</Table.Cell>
											<Table.Cell textAlign='right' active colSpan='3'>{UANG( tunai )}</Table.Cell>
										</Table.Row>
										<Table.Row warning>
											<Table.Cell >Kembalian</Table.Cell>
											<Table.Cell textAlign='right' colSpan='3'>{UANG(tunai - SUM( this.state.pembelian.total ))}</Table.Cell>
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
					<Card.Group itemsPerRow={4}>{console.log( list_barang )}{list_barang.map(val => ( <Barang addToCart={this.addToCart} barang={val}/> ))}</Card.Group>
				</Container>
			</div>
		)
	}
}
export default Transaksi;