import React, { Component } from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { GajiRow } from "./gaji_row";
class GajiTable extends Component {
	render( ) {
		const { _data, _show } = this.props;
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='4'>
							<Button floated="right" onClick={( ) => this.props._show( 'new' )} positive>add</Button>
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell>Jabatan</Table.HeaderCell>
						<Table.HeaderCell>Cabang</Table.HeaderCell>
						<Table.HeaderCell>Gaji</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign='center'><Icon name='settings'/></Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{_data.map( ( gaji, n ) =>< GajiRow key = {
						n
					}
					_show = {
						_show
					}
					gaji = {
						gaji
					} /> )}</Table.Body>
			</Table>
		)
	}
}
export default GajiTable;