// @flow

import * as React from 'react'
import styled from 'styled-components'
import type { Category } from '../../types'

import LinkButton from '../LinkButton'
const Name = styled.th`
	width: 5em;
	border-right: solid;
`

type Props = { category: Category }

const HobbyGallery = ({ category }: Props) => (
	<tr>
		<Name>{category.name}</Name>
		<td>{category.description}</td>
		<td>
			{category.links.map(link => (
				<LinkButton key={link.href} href={link.href} text={link.text} />
			))}
		</td>
	</tr>
)
export default HobbyGallery
