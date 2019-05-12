import React, { Component } from 'react';
import { Table, Icon, Button, Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import { barang } from "../transaksi/component/data_barang";
class DataBarang extends Component {
	render( ) {
		const { legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		return (
			<div>
				<div style={{
					margin: '10vh',
					textAlign: 'center'
				}}>
					<Header as='h1'>
						Data Barang
					</Header>
				</div>
				<Table celled selectable padded unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>kode</Table.HeaderCell>
							<Table.HeaderCell>Nama Barang</Table.HeaderCell>
							<Table.HeaderCell>Desc</Table.HeaderCell>
							<Table.HeaderCell>QTY</Table.HeaderCell>
							<Table.HeaderCell>Harga Jual</Table.HeaderCell>
							<Table.HeaderCell textAlign='center'><Icon name='settings'/></Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{barang.map(data => (
							<Table.Row>
								<Table.Cell>#{data.id}</Table.Cell>
								<Table.Cell>{data.nama_barang}</Table.Cell>
								<Table.Cell>{data.desc}</Table.Cell>
								<Table.Cell>{data.stok}</Table.Cell>
								<Table.Cell textAlign='right'>{data.harga}</Table.Cell>
								<Table.Cell collapsing>
									<Button icon>
										<Icon name='edit outline'/>
									</Button>
									<Button icon>
										<Icon name='trash'/>
									</Button>
								</Table.Cell>
							</Table.Row>
						))}</Table.Body>
				</Table>
			</div>
		)
	}
}
export default DataBarang;