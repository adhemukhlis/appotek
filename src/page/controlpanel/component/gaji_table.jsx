import React, { Component } from 'react';
import { Table, Icon, Button, Input } from 'semantic-ui-react';
import { GajiRow } from "./gaji_row";
class GajiTable extends Component {
	render( ) {
		const { _data, _show, _search, handleInputChange } = this.props;
		return (
			<Table celled selectable padded unstackable>
				<Table.Header>
					<Table.Row >
						<Table.HeaderCell colSpan='4'>
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