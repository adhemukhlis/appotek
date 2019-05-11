import React, { Component } from 'react';
import { Card, Input, Button, Image, Label } from "semantic-ui-react";
import { UANG } from "../../component/func_lib";
class Barang extends Component {
	state = {
		jumlahBeli: 1
	};
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
		})}
	}
	addToChart = () => {
		const item = {
			item:this.props.barang.nama_barang,
			jumlah:this.state.jumlahBeli,
			harga:this.props.barang.harga,
			total: this.state.jumlahBeli*this.props.barang.harga
		}
		this.props.addToCart(item)
	}
	render( ) {
		return (
			<Card>
				<Image src={this.props.barang.imgUrl}/>
				<Card.Content>
					<Label as='a' color='red' ribbon style={{
						marginBottom: "10px"
					}}>{UANG( this.props.barang.harga )}</Label>
					<Card.Header>{this.props.barang.nama_barang}</Card.Header>
					<Card.Meta>
						<span className='date'>{'#' + this.props.barang.id}
							/{this.props.barang.desc}</span>
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