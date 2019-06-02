import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { UANG } from '../../component/func_lib';
export const GajiRow = props => (
	<Table.Row>
		<Table.Cell>{props.gaji.jabatan}</Table.Cell>
		<Table.Cell>{props.gaji.cabang}</Table.Cell>
		<Table.Cell textAlign='right'>{UANG( props.gaji.gaji )}</Table.Cell>
		<Table.Cell collapsing>
			<Button icon onClick={( ) => props._show( props.gaji )}>
				<Icon name='edit outline'/>
			</Button>
		</Table.Cell>
	</Table.Row>
);