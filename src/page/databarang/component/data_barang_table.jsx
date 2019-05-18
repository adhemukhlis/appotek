import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { DataBarangRow } from "./data_barang_row";
class DataBarangTable extends Component {
	render( ) {
		const { _data, _show } = this.props;
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell collapsing>kode</Table.HeaderCell>
						<Table.HeaderCell>Nama Barang</Table.HeaderCell>
						<Table.HeaderCell>Desc</Table.HeaderCell>
						<Table.HeaderCell>Filename</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign='center'><Icon name='settings'/></Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{_data.map( ( data, n ) =>< DataBarangRow key = {
						n
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
export default DataBarangTable;