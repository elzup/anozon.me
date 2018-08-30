// @flow
import * as React from 'react'
import styled from 'styled-components'

import Screen from '../Screen'

import HobbyGallery from './HobbyGallery'
import HobbyTr from './HobbyTr'

import { categories } from '../../api/data'

type Props = {}

const Table = styled.table`
	td {
		height: 80px;
	}
	@media (max-width: 650px) {
		font-size: 0.8em;
	}
`

const HobbyScreen = (props: Props) => (
	<Screen id="hobby" title="Hobby" description="趣味">
		<div>
			<Table>
				<tbody>
					{categories.map(category => (
						<HobbyTr key={category.name} category={category} />
					))}
				</tbody>
			</Table>
		</div>
		<HobbyGallery />
	</Screen>
)

export default HobbyScreen
