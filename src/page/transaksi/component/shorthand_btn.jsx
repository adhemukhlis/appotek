import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
class ShortHandButtons extends Component {
	render( ) {
		return (
			<div style={{marginTop:'10px'}}>
				<Button onClick={( ) => this.props.onbtnClick( 100000 )}>
					100k
				</Button>
				<Button onClick={( ) => this.props.onbtnClick( 50000 )}>
					50k
				</Button>
				<Button onClick={( ) => this.props.onbtnClick( 20000 )}>
					20k
				</Button>
				<Button onClick={( ) => this.props.onbtnClick( 10000 )}>
					10k
				</Button>
				<Button onClick={( ) => this.props.onbtnClick( 5000 )}>
					5k
				</Button>
				<Button onClick={( ) => this.props.onbtnClick( 2000 )}>
					2k
				</Button>
				<Button onClick={( ) => this.props.onbtnClick( 1000 )}>
					1k
				</Button>
			</div>
		)
	}
}
export default ShortHandButtons;