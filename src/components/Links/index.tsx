import * as React from 'react'
import styled from 'styled-components'
import LinksItem, { Props as LinksItemProps } from '../LinksItem'

type Props = {}

const Wrapper = styled.section`
	margin: 10px 0;
	display: flex;
	justify-content: center;
	@media (max-width: 700px) {
		margin: 0;
	}
`

const links: LinksItemProps[] = [
	{
		title: 'Twitter',
		href: 'https://twitter.com/anozon',
		icon: ['fab', 'twitter'],
	},
	{
		title: 'GitHub',
		href: 'https://github.com/elzup',
		icon: ['fab', 'github'],
	},
	{
		title: 'YouTube',
		href: 'https://www.youtube.com/channel/UCMo7HkIMW9AmbvODRkxwfnw',
		icon: ['fab', 'youtube'],
	},
	{
		title: 'Blog',
		href: 'https://blog.anozon.me/',
		icon: 'pen-nib',
	},
	{
		title: 'Amazon',
		href:
			'https://www.amazon.co.jp/registry/wishlist/Y1RL67S3309E/ref=cm_sw_r_cp_ep_ws_0E5FBbDE819XC',
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
