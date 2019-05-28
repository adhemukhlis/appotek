import React, { Component } from 'react';
import { Table, Icon, Input, Button } from 'semantic-ui-react';
import { DataBarangRow } from "./data_barang_cabang_row";
class DataBarangTable extends Component {
	render( ) {
		const { _data, _show,handleInputChange, _search,  } = this.props;
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='5'>
							<Input floated="left" icon='search' placeholder='Search' name='search' value={_search} onChange={handleInputChange}/>
							<Button floated="right" onClick={( ) => this.props._show( 'new' )} positive>add</Button>
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell collapsing>kode</Table.HeaderCell>
						<Table.HeaderCell>Nama Barang</Table.HeaderCell>
						<Table.HeaderCell>Stok</Table.HeaderCell>
						<Table.HeaderCell>Harga</Table.HeaderCell>
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