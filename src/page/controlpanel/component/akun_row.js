import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { UserRole } from '../../config';
export const AkunRow = props => (
	<Table.Row error={props.user.role !== UserRole[0] && props.user.role !== UserRole[1] && props.user.role !== UserRole[2]}>
		<Table.Cell>{props.user.email}</Table.Cell>
		<Table.Cell>{props.user.nik !== '0'
				? props.user.nik
				: 'Illegal'}</Table.Cell>
		<Table.Cell>{props.user.name}</Table.Cell>
		<Table.Cell >{props.user.role === UserRole[0]
				? 'Owner'
				: props.user.role === UserRole[1]
					? 'Kepala Cabang'
					: props.user.role === UserRole[2]
						? 'Karyawan'
						: 'Illegal'}</Table.Cell>
		<Table.Cell >{props.user.cabang!==0?props.user.cabang:'Illegal'}</Table.Cell>
		<Table.Cell >
			<Button icon onClick={( ) => props._show( props.user )}>
				<Icon name='edit outline'/>
			</Button>
		</Table.Cell>
	</Table.Row>
);