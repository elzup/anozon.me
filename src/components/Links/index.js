// @flow
import * as React from 'react'
import styled from 'styled-components'
import LinksItem, { type Props as LinksItemProps } from '../LinksItem'

type Props = {}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`

const links: LinksItemProps[] = [
	{
		title: 'Twitter',
		href: '',
		icon: ['fab', 'twitter'],
	},
	{
		title: 'GitHub',
		href: '',
		icon: ['fab', 'github'],
	},
	{
		title: 'YouTube',
		href: '',
		icon: ['fab', 'youtube'],
	},
	{
		title: 'HatenaBlog',
		href: '',
		icon: 'pen-nib',
	},
	{
		title: 'Amazon',
		href: '',
		icon: 'gift',
	},
]

const Links = (props: Props) => (
	<Wrapper>
		{links.map(linkProps => (
			<LinksItem key={linkProps.title} {...linkProps} />
		))}
	</Wrapper>
)

export default Links
