import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { data, option } from "./component/config";
import { Line } from 'react-chartjs-2';
import { Segment, Grid, Header, Icon, Label } from 'semantic-ui-react';
import { UANG, SUM } from "../component/func_lib";
class Pemasukan extends Component {
	render( ) {
		const { legalAccess } = this.props;
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
						Pemasukan
					</Header>
				</div>
				<Grid columns={3} stackable textAlign='center'>
					<Grid.Row verticalAlign='middle'>
						<Grid.Column>
							<Segment padded>
								<Header>
									<h2>Jakarta</h2>
									<Label size='massive' color='green'>
										<Icon name='arrow down'/>{UANG(SUM( data.datasets[0].data ))}</Label>
								</Header>
							</Segment>
						</Grid.Column>
						<Grid.Column>
							<Segment padded>
								<Header>
									<h2>Purwokerto 1</h2>
									<Label size='massive' color='green'>
										<Icon name='arrow down'/>{UANG(SUM( data.datasets[1].data ))}</Label>
								</Header>
							</Segment>
						</Grid.Column>
						<Grid.Column>
							<Segment padded>
								<Header>
									<h2>Purwokerto 2</h2>
									<Label size='massive' color='green'>
										<Icon name='arrow down'/>{UANG(SUM( data.datasets[2].data ))}</Label>
								</Header>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Line options={option( 'Month' )} data={data}/>
			</div>
		)
	}
}
export default Pemasukan;