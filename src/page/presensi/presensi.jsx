import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Checkbox, Icon, Table, Header } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { data, option } from "./component/config";
class Presensi extends Component {
	render( ) {
		const {  legalAccess } = this.props;
		if ( !legalAccess ) {
			return <Redirect push to='/'/>
		}
		return (
			<div>
				<div style={{
					margin: '10vh',
					textAlign: 'center'
				}}>
					<Header as='h1'>
						Karyawan
					</Header>
				</div>
				<Table padded celled unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell collapsing>NIK</Table.HeaderCell>
							<Table.HeaderCell collapsing>Nama</Table.HeaderCell>
							<Table.HeaderCell collapsing>Masuk</Table.HeaderCell>
							<Table.HeaderCell collapsing>Absen</Table.HeaderCell>
							<Table.HeaderCell textAlign='center'>Presensi</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>001</Table.Cell>
							<Table.Cell>John Lilki</Table.Cell>
							<Table.Cell textAlign='center'>9</Table.Cell>
							<Table.Cell textAlign='center'>2</Table.Cell>
							<Table.Cell><Line height={30} options={option} data={data[0]}/></Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>002</Table.Cell>
							<Table.Cell>Jamie Harington</Table.Cell>
							<Table.Cell textAlign='center'>10</Table.Cell>
							<Table.Cell textAlign='center'>1</Table.Cell>
							<Table.Cell><Line height={30} options={option} data={data[1]}/></Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>003</Table.Cell>
							<Table.Cell>Jill Lewis</Table.Cell>
							<Table.Cell textAlign='center'>11</Table.Cell>
							<Table.Cell textAlign='center'>0</Table.Cell>
							<Table.Cell><Line height={30} options={option} data={data[2]}/></Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
				<Table compact celled definition unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell/>
							<Table.HeaderCell>NIK</Table.HeaderCell>
							<Table.HeaderCell>Nama Karyawan</Table.HeaderCell>
							<Table.HeaderCell>Cabang</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell collapsing>
								<Checkbox slider/>
							</Table.Cell>
							<Table.Cell>0001</Table.Cell>
							<Table.Cell>John Lilki</Table.Cell>
							<Table.Cell>Purwokerto</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<Checkbox slider/>
							</Table.Cell>
							<Table.Cell>0002</Table.Cell>
							<Table.Cell>Jamie Harington</Table.Cell>
							<Table.Cell>Purwokerto</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing>
								<Checkbox slider/>
							</Table.Cell>
							<Table.Cell>0003</Table.Cell>
							<Table.Cell>Jill Lewis</Table.Cell>
							<Table.Cell>Purwokerto</Table.Cell>
						</Table.Row>
					</Table.Body>
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell/>
							<Table.HeaderCell colSpan='4'>
								<Button floated='right' icon labelPosition='left' primary size='small'>
									<Icon name='calendar check outline'/>
									Submit
								</Button>
								<Button size='small'>Hadir Semua</Button>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</div>
		)
	}
}
export default Presensi;