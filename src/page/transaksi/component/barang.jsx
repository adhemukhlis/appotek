import React, { Component } from 'react';
import { Card, Input, Button, Image, Label } from "semantic-ui-react";
import { UANG } from "../../component/func_lib";
import { firebaseRef_BARANG } from '../../../firebase/firebaseRef';
class Barang extends Component {
	state = {
		jumlahBeli: 1,
		desc: null,
		nama_barang: null,
		imgUrl: null
	};
	componentWillMount( ) {
		firebaseRef_BARANG
			.child( this.props.barang.id )
			.on('value', data => {
				this.setState({
					desc: data
						.val( )
						.desc,
					nama_barang: data
						.val( )
						.nama_barang,
					imgUrl: data
						.val( )
						.img
				})
			})
	}
	plusFunc = ( ) => {
		if ( this.state.jumlahBeli < this.props.barang.stok ) {
			this.setState({
				jumlahBeli: this.state.jumlahBeli + 1
			})
		}
	}
	minFunc = ( ) => {
		if ( this.state.jumlahBeli > 1 ) {
			this.setState({
				jumlahBeli: this.state.jumlahBeli - 1
			})
		}
	}
	addToChart = ( ) => {
		const item = {
			id: this.props.barang.id,
			item: this.state.nama_barang,
			jumlah: this.state.jumlahBeli,
			harga: this.props.barang.harga,
			stok: this.props.barang.stok,
			total: parseInt( this.state.jumlahBeli ) * parseInt( this.props.barang.harga )
		};
		this
			.props
			.addToCart( item )
	}
	render( ) {
		const { desc, nama_barang, imgUrl } = this.state;
		return (
			<Card>
				<Image src={'https://appotek.netlify.com/static/media/' + imgUrl}/>
				<Card.Content>
					<Label as='a' color='red' ribbon style={{
						marginBottom: "10px"
					}}>{UANG( this.props.barang.harga )}</Label>
					<Card.Header>{nama_barang}</Card.Header>
					<Card.Meta>
						<span className='date'>{'#' + this.props.barang.id + ' - ' + desc}</span>
					</Card.Meta>
					<Card.Description>
						<Input value={this.state.jumlahBeli + "/" + this.props.barang.stok} type='text' placeholder='qty..' fluid action>
							<input/>
							<Button icon='minus' onClick={this.minFunc}/>
							<Button icon='plus' onClick={this.plusFunc}/>
						</Input>
					</Card.Description>
				</Card.Content>
				<Card.Content textAlign='center' extra>
					<Button fluid icon='cart' onClick={this.addToChart}/>
				</Card.Content>
			</Card>
		)
	}
}
export default Barang;