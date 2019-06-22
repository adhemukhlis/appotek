import React, { Component } from 'react';
import { Table, Icon, Input } from 'semantic-ui-react';
import DataTransaksiRow from "./data_transaksi_cabang_row";
class DataTransaksiTable extends Component {
	render( ) {
		const { _data, _show, handleInputChange, _search } = this.props;
		return (
			<Table celled selectable padded unstackable structured>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='11'>
							<Input floated="left" icon='search' placeholder='Search' name='search' value={_search} onChange={handleInputChange}/>
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell rowSpan='2' >kode</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' >waktu</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' >kasir</Table.HeaderCell>
						<Table.HeaderCell colSpan='4'>pembelian</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' >total</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' >tunai</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' >kembali</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2'  textAlign='center'><Icon name='settings'/></Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell>id</Table.HeaderCell>
						<Table.HeaderCell>barang</Table.HeaderCell>
						<Table.HeaderCell>jumlah</Table.HeaderCell>
						<Table.HeaderCell>harga</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{_data.map( ( data, n ) =><DataTransaksiRow  key = {
						data.paymentcode+n
					}
					_show = {
						_show
					}
					data = {
						data
					} /> )}</Table.Body>
			</Table>
		)
	}
}
export default DataTransaksiTable;