import React, { Component } from 'react';
import { Table, Icon, Input, Button } from 'semantic-ui-react';
import { OperasionalRow } from "./operasional_row";
class OperasionalTable extends Component {
	render( ) {
		const { _data, _show, handleInputChange, _search } = this.props;
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='6'>
							<Input floated="left" icon='search' placeholder='Search' name='search' value={_search} onChange={handleInputChange}/>
							<Button floated="right" onClick={( ) => this.props._show( 'new' )} positive animated='vertical'>
								<Button.Content hidden>Add</Button.Content>
								<Button.Content visible>
									<Icon name='plus'/>
								</Button.Content>
							</Button>
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell>kode</Table.HeaderCell>
						<Table.HeaderCell>Pembelian</Table.HeaderCell>
						<Table.HeaderCell>QTY</Table.HeaderCell>
						<Table.HeaderCell>Harga</Table.HeaderCell>
						<Table.HeaderCell>Total</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign='center'><Icon name='settings'/></Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{_data.map( ( data, n ) =>< OperasionalRow key = {
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
export default OperasionalTable;