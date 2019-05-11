import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Barang from "../databarang/data_barang";
import Pemasukan from "../pemasukan/pemasukan";
import Pengeluaran from "../pengeluaran/pengeluaran";
import Absensi from "../presensi/presensi";
class Dashboard extends Component {
	state = {
		activeItem: 'pemasukan',
		visible: false
	};
	handleHideClick = ( ) => this.setState({ visible: false });
	handleShowClick = ( ) => this.setState({
		visible: !this.state.visible
	});
	handleSidebarHide = ( ) => this.setState({ visible: false });
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });
	render( ) {
		const { activeItem, visible } = this.state;
		return (
			<div>
				{/* <Sidebar.Pushable as={Segment}>
					<Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible={visible} width='thin'>
						<Menu.Item as='a' name='pengeluaran' onClick={this.handleItemClick}>
							<Ic_r_arrow_alt_from_left height='6vh' fill='#fff'/>
							<p>Pengeluaran</p>
						</Menu.Item>
						<Menu.Item as='a' name='barang' onClick={this.handleItemClick}>
							<Ic_r_pallet height='6vh' fill='#fff'/>
							<p>Barang</p>
						</Menu.Item>
						<Menu.Item as='a' name='pemasukan' onClick={this.handleItemClick}>
							<Ic_r_chart_line height='6vh' fill='#fff'/>
							<p>Pemasukan</p>
						</Menu.Item>
						<Menu.Item as='a' name='karyawan' onClick={this.handleItemClick}>
							<Ic_r_id_card height='6vh' fill='#fff'/>
							<p>Karyawan</p>
						</Menu.Item>
					</Sidebar>
					<Sidebar.Pusher dimmed={false}> */}
						<div style={{
							minHeight: '100vh'
						}}>
							{/* <div onClick={this.handleShowClick}>
								<FloatButton active={this.state.visible} sizeIcon={8}/>
							</div> */}
							<Grid textAlign='center'>
								<Grid.Column width={12}>{activeItem === 'barang'
										? <Barang/>
										: activeItem === 'pemasukan'
											? <Pemasukan/>
											: activeItem === 'pengeluaran'
												? <Pengeluaran/>
												: activeItem === 'karyawan'
													? <Absensi/>
													: null}</Grid.Column>
							</Grid>
						</div>
					{/* </Sidebar.Pusher>
				</Sidebar.Pushable> */}
			</div>
		)
	}
}
export default Dashboard;