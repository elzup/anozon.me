import * as React from 'react'
import styled from 'styled-components'
import { Category } from '../../types'

import LinkButton from '../LinkButton'

const Name = styled.th`
	width: 5em;
	border-right: solid;
	border-bottom: solid;
`

type Props = { category: Category }

const HobbyTr = ({ category }: Props) => (
	<React.Fragment>
		{category.hobbies.map((hobby, i) => (
			<tr key={i}>
				{i === 0 && (
					<Name rowSpan={category.hobbies.length}>{category.name}</Name>
				)}
				<td>{hobby.name}</td>
				<td>
					{hobby.notes &&
						hobby.notes.map(note => {
							if (note.href) {
								return (
									<LinkButton
										key={note.text}
										href={note.href}
										text={note.text}
									/>
								)
							}
							return <p key={note.text}>{note.text}</p>
						})}
				</td>
			</tr>
		))}
	</React.Fragment>
)

export default HobbyTr
