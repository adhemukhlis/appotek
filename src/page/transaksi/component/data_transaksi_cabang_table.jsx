import React, { Component } from 'react';
import { Table, Input, Button, Select } from 'semantic-ui-react';
import DataTransaksiRow from "./data_transaksi_cabang_row";
import {MonthOptions} from "../../config";
class DataTransaksiTable extends Component {
	render( ) {
		const { _data, _show, handleInputChange,handleDropDownChange,handleYearFilterChange, _search, _tahun, _applyfilter } = this.props;
		
		return (
			<Table celled selectable padded unstackable structured>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='10'>
							<Input floated="left" icon='search' placeholder='Search' name='search' value={_search} onChange={handleInputChange}/>
							<Input style={{
								paddingLeft: 10
							}} type='text' type='number'placeholder='tahun' name='tahun' value={_tahun} onChange={handleYearFilterChange} action>
								<input/>
								<Select onChange={handleDropDownChange} name='bulan' compact options={MonthOptions} defaultValue={0}/>
								<Button type='submit' onClick={()=>_applyfilter()}>Apply</Button>
							</Input> 
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell rowSpan='2' collapsing textAlign='center'>Transaksi ID</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' collapsing textAlign='center'>Waktu</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' collapsing textAlign='center'>Kasir</Table.HeaderCell>
						<Table.HeaderCell colSpan='4' textAlign='center'>Pembelian</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' collapsing textAlign='center'>Total</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' collapsing textAlign='center'>Tunai</Table.HeaderCell>
						<Table.HeaderCell rowSpan='2' collapsing textAlign='center'>Kembali</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell textAlign='center' collapsing>id</Table.HeaderCell>
						<Table.HeaderCell >Barang</Table.HeaderCell>
						<Table.HeaderCell textAlign='center' collapsing>Jumlah</Table.HeaderCell>
						<Table.HeaderCell textAlign='center' collapsing>Harga</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{_data.map( ( data, n ) =>< DataTransaksiRow key = {
						data.paymentcode + n
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