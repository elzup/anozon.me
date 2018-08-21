// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import type { State, House } from '../../types'
import * as selectors from './selectors'
import { loadHouses } from './logic'

type Props = {
	houses: House[],
	loadHouses: Function,
}

class Container extends React.Component<Props> {
	componentDidMount() {
		this.props.loadHouses()
	}

	render() {
		const { props } = this
		return (
			<div>
				{props.houses.length === 0 ? (
					<div>ハウスが登録されていません</div>
				) : (
					<List data-test="house-list">
						{props.houses.map(house => (
							<ListItem key={house.id}>
								<Typography variant="body1">{house.name}</Typography>
								<Button
									component={props => (
										<Link
											data-test={`house-${house.id}-link`}
											to={`/houses/${house.id}`}
											{...props}
										/>
									)}
								>
									開く
								</Button>
							</ListItem>
						))}
					</List>
				)}
			</div>
		)
	}
}

const ms = (state: State) => ({
	houses: selectors.getHouses(state),
})

const conn = connect(ms, { loadHouses })

export default conn(Container)
