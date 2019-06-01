import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import {UANG} from "../../component/func_lib";
export const OperasionalRow = props => (
	<Table.Row>
		<Table.Cell>{props.data.id}</Table.Cell>
		<Table.Cell>{props.data.pembelian}</Table.Cell>
		<Table.Cell>{props.data.qty}</Table.Cell>
		<Table.Cell>{UANG(props.data.harga)}</Table.Cell>
		<Table.Cell>{UANG(props.data.qty*props.data.harga)}</Table.Cell>
		<Table.Cell >
			<Button icon onClick={( ) => props._show( props.data )}>
				<Icon name='edit outline'/>
			</Button>
		</Table.Cell>
	</Table.Row>
);