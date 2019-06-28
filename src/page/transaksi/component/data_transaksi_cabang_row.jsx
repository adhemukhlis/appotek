import React, { Component } from 'react';
import { UANG, ShortDate } from "../../component/func_lib";
import { Table, Button } from 'semantic-ui-react';
import TransItem from "./transaksi_item";
class DataTransaksiRow extends Component {
	state = {
		show: false
	};
	render( ) {
		const { show } = this.state;
		const { data } = this.props;
		return (
			<Table.Row>
				<Table.Cell>{data.paymentcode}</Table.Cell>
				<Table.Cell>{ShortDate( data.datetime )}</Table.Cell>
				<Table.Cell>{data.kasir}</Table.Cell>{show
					? <TransItem transaksi={data.paymentcode}/>
					: <Table.Cell textAlign='center' colspan='4'>
						<Button onClick={( ) => this.setState({
							show: !show
						})}>Show detail</Button>
					</Table.Cell>}
				<Table.Cell textAlign='right'>{UANG( data.total )}</Table.Cell>
				<Table.Cell textAlign='right'>{UANG( data.tunai )}</Table.Cell>
				<Table.Cell textAlign='right'>{UANG( data.kembali )}</Table.Cell>
			</Table.Row>
		)
	}
}
export default DataTransaksiRow;