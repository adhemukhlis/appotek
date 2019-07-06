import React, { Component } from 'react';
import {
	Table,
	Icon,
	Input,
	Button,
	Dropdown,
	Select
} from 'semantic-ui-react';
import { PengeluaranRow } from "./pengeluaran_row";
class PengeluaranTable extends Component {
	render( ) {
		const { _data, _show, handleInputChange, handleDropDownChange, _search,_tahun, _applyfilter } = this.props;
		const options = [
			{
				key: 0,
				text: 'All',
				value: 0
			}, {
				key: 1,
				text: 'Jan',
				value: 1
			}, {
				key: 2,
				text: 'Feb',
				value: 2
			}, {
				key: 3,
				text: 'Mar',
				value: 3
			}, {
				key: 4,
				text: 'Apr',
				value: 4
			}, {
				key: 5,
				text: 'May',
				value: 5
			}, {
				key: 6,
				text: 'Jun',
				value: 6
			}, {
				key: 7,
				text: 'Jul',
				value: 7
			}, {
				key: 8,
				text: 'Aug',
				value: 8
			}, {
				key: 9,
				text: 'Sep',
				value: 9
			}, {
				key: 10,
				text: 'Oct',
				value: 10
			}, {
				key: 11,
				text: 'Nov',
				value: 11
			}, {
				key: 12,
				text: 'Des',
				value: 12
			}
		];
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='9'>
							<Input floated="left" icon='search' placeholder='Search' name='search' value={_search} onChange={handleInputChange}/>
							<Input style={{
								paddingLeft: 10
							}} type='text' type='number'placeholder='tahun' name='tahun' value={_tahun} onChange={handleInputChange} action>
								<input/>
								<Select onChange={handleDropDownChange} name='bulan' compact options={options} defaultValue={0}/>
								<Button type='submit' onClick={()=>_applyfilter()}>Apply</Button>
							</Input> 
							< Button floated = "right" onClick = {
							( ) => this
								.props
								._show( 'new' )}
							positive animated='vertical'><Button.Content hidden>Add</Button.Content>
							<Button.Content visible>
								<Icon name='plus'/>
							</Button.Content>
						</Button>
					</Table.HeaderCell>
				</Table.Row>
				<Table.Row>
					<Table.HeaderCell >date</Table.HeaderCell>
					<Table.HeaderCell>Pembelian</Table.HeaderCell>
					<Table.HeaderCell>Jenis Pembelian</Table.HeaderCell>
					<Table.HeaderCell>Cabang</Table.HeaderCell>
					<Table.HeaderCell>QTY</Table.HeaderCell>
					<Table.HeaderCell>Satuan</Table.HeaderCell>
					<Table.HeaderCell>Harga</Table.HeaderCell>
					<Table.HeaderCell>Total</Table.HeaderCell>
					<Table.HeaderCell collapsing textAlign='center'><Icon name='settings'/></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>{_data.map( ( data, n ) =>< PengeluaranRow key = {
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
export default PengeluaranTable;