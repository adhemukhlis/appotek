import React, { Component } from 'react';
import { Card, Label } from 'semantic-ui-react';
class Selected_Item extends Component {
	render( ) {
		return (
			<Card>
				<Card.Content>
                                <Label as='a' color='green' ribbon='right'>
						Overview
					</Label>
					<Card.Header>Steve Sanders</Card.Header>
					<Card.Meta>Friends of Elliot</Card.Meta>
                                       
					<Card.Description>
						Steve wants to add you to the group
						<strong>best friends</strong>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<p>stok : 12</p>
				</Card.Content>
			</Card>
		)
	}
}
export default Selected_Item;