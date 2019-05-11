import React, { Component } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';
class Operasional extends Component {
	render( ) {
		return (
			<div style={{
				marginBottom: '100px'
			}}>
				<Header style={{
					margin: '20px'
				}} as='h1'>Pengeluaran Operasional</Header>
				<Form>
					<Form.Field >
						<label>kode</label>
						<input placeholder='Kode pembelian'/>
					</Form.Field>
					<Form.Field>
						<label>Pembelian</label>
						<input placeholder='Pembelian'/>
					</Form.Field>
					<Form.Group widths='equal'>
						<Form.Field>
							<label>QTY</label>
							<input placeholder='Banyak Barang'/>
						</Form.Field>
						<Form.Field>
							<label>Harga</label>
							<input placeholder='Harga beli'/>
						</Form.Field>
					</Form.Group>
					<Form.Field>
						<label>Total</label>
						<input readOnly/>
					</Form.Field>
					<Button type='submit'>Submit</Button>
				</Form>
			</div>
		)
	}
}
export default Operasional;