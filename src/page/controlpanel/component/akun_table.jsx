import React, { Component } from 'react';
import { Table, Icon, Input } from 'semantic-ui-react';
import { AkunRow } from "./akun_row";
class AkunTable extends Component {
	render( ) {
		const { _data, _show, handleInputChange, _search } = this.props;
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='5'>
							<Input floated="left" icon='search' placeholder='Search' name='search' value={_search} onChange={handleInputChange}/>
						</Table.HeaderCell>
					</Table.Row>
					<Table.Row>
						<Table.HeaderCell>Email</Table.HeaderCell>
						<Table.HeaderCell>NIK</Table.HeaderCell>
						<Table.HeaderCell>Nama</Table.HeaderCell>
						<Table.HeaderCell>User Type</Table.HeaderCell>
						<Table.HeaderCell collapsing textAlign='center'><Icon name='settings'/></Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{_data.map( ( user, n ) =>< AkunRow key = {
						n
					}
					_show = {
						_show
					}
					user = {
						user
					} /> )}</Table.Body>
			</Table>
		)
	}
}
export default AkunTable;