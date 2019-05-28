import React from 'react';
import {UANG} from "../../../component/func_lib";
import { Table, Button, Icon } from 'semantic-ui-react';
export const DataBarangRow = props => (
	<Table.Row>
		<Table.Cell>#{props.data.id}</Table.Cell>
		<Table.Cell>{props.data.nama_barang}</Table.Cell>
		<Table.Cell>{props.data.stok}</Table.Cell>
		<Table.Cell>{UANG(props.data.harga)}</Table.Cell>
		<Table.Cell >
			<Button icon onClick={( ) => props._show( props.data )}>
				<Icon name='edit outline'/>
			</Button>
		</Table.Cell>
	</Table.Row>
);