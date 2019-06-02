import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import {UANG, ShortDate} from "../../component/func_lib";
export const PengeluaranRow = props => (
	<Table.Row>
		<Table.Cell collapsing>{ShortDate(props.data.datetime)}</Table.Cell>
		<Table.Cell>{props.data.pembelian}</Table.Cell>
		<Table.Cell collapsing>{props.data.jenis_pembelian}</Table.Cell>
		<Table.Cell collapsing>{props.data.cabang}</Table.Cell>
		<Table.Cell collapsing>{props.data.qty}</Table.Cell>
		<Table.Cell collapsing>{props.data.satuan}</Table.Cell>
		<Table.Cell textAlign='right'>{UANG(props.data.harga)}</Table.Cell>
		<Table.Cell textAlign='right'>{UANG(props.data.qty*props.data.harga)}</Table.Cell>
		<Table.Cell collapsing>
			<Button icon onClick={( ) => props._show( props.data )}>
				<Icon name='edit outline'/>
			</Button>
		</Table.Cell>
	</Table.Row>
);