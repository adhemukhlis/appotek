import React, { Component } from 'react';
import {
	Form,
	Header,
	Button,
	Table,
	Icon
} from 'semantic-ui-react';
import {UANG} from "../../component/func_lib";
class Operasional extends Component {
	render( ) {
		return (
			<div style={{
				marginBottom: '100px'
			}}>
				<Header style={{
					margin: '20px'
				}} as='h1'>Gaji</Header>
				<Table celled selectable padded unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Jabatan</Table.HeaderCell>
							<Table.HeaderCell>Cabang</Table.HeaderCell>
							<Table.HeaderCell>Gaji</Table.HeaderCell>
							<Table.HeaderCell textAlign='center'><Icon name='settings'/></Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Owner</Table.Cell>
							<Table.Cell>General</Table.Cell>
							<Table.Cell>{UANG(0)}</Table.Cell>
							<Table.Cell collapsing>
								<Button icon>
									<Icon name='edit outline'/>
								</Button>
								<Button icon>
									<Icon name='trash'/>
								</Button>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Kepala Cabang</Table.Cell>
							<Table.Cell>Purwokerto</Table.Cell>
							<Table.Cell>{UANG(5000000)}</Table.Cell>
							<Table.Cell collapsing>
								<Button icon>
									<Icon name='edit outline'/>
								</Button>
								<Button icon>
									<Icon name='trash'/>
								</Button>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Kepala Cabang</Table.Cell>
							<Table.Cell>Jakarta</Table.Cell>
							<Table.Cell>{UANG(7000000)}</Table.Cell>
				
							<Table.Cell collapsing>
								<Button icon>
									<Icon name='edit outline'/>
								</Button>
								<Button icon>
									<Icon name='trash'/>
								</Button>
							</Table.Cell>
						</Table.Row>
                                                <Table.Row>
							<Table.Cell>Karyawan</Table.Cell>
							<Table.Cell>Jakarta</Table.Cell>
							<Table.Cell>{UANG(4000000)}</Table.Cell>
				
							<Table.Cell collapsing>
								<Button icon>
									<Icon name='edit outline'/>
								</Button>
								<Button icon>
									<Icon name='trash'/>
								</Button>
							</Table.Cell>
						</Table.Row>
                                                <Table.Row>
							<Table.Cell>Karyawan</Table.Cell>
							<Table.Cell>Purwokerto</Table.Cell>
							<Table.Cell>{UANG(3500000)}</Table.Cell>
				
							<Table.Cell collapsing>
								<Button icon>
									<Icon name='edit outline'/>
								</Button>
								<Button icon>
									<Icon name='trash'/>
								</Button>
							</Table.Cell>
						</Table.Row>
						
					</Table.Body>
				</Table>
				<Form>
					<Form.Field>
						<label>Jabatan</label>
						<input placeholder='Jabatan'/>
					</Form.Field>
					<Form.Field>
						<label>Cabang</label>
						<input placeholder='Cabang'/>
					</Form.Field>
                                        <Form.Field>
						<label>Gaji</label>
						<input placeholder='Gaji' />
					</Form.Field>
					<Button type='submit'>Save</Button>
				</Form>
			</div>
		)
	}
}
export default Operasional;