import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
class StockBarang extends Component {
	render( ) {
		return (
			<div>
				<Header style={{
					margin: '20px'
				}} as='h1'>Pembelian Barang</Header>
				<Form>
					<Form.Input fluid label='kode' value='#36' placeholder='Kode Barang'/>
					<Form.Input fluid label='Nama Barang' value='Bodrex' placeholder='Nama Barang'/>
					<Form.Group widths='equal'>
						<Form.Input fluid label='QTY' value='30' placeholder='Banyak Barang'/>
						<Form.Input fluid label='Harga' value='4000' placeholder='Harga beli'/>
					</Form.Group>
					<Form.Input fluid label='Total' placeholder='Read only' value={30 * 4000} readOnly/>
					<Form.Input fluid label='Harga Jual' value='5000' placeholder='Harga beli'/>
					<Form.Button>Submit</Form.Button>
				</Form>
			</div>
		)
	}
}
export default StockBarang;