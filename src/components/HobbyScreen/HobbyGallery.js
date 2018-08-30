// @flow

import * as React from 'react'
import styled from 'styled-components'
import { GridFrame } from '../'

import LinkButton from '../LinkButton'

type HobbyImage = {
	src: string,
	href: string,
}

type Props = {}

const Wrapper = styled.div`
	display: flex;
`

const Box = styled.div`
	position: relative;
	width: 33%;
`

const Image = styled.img`
	width: 100%;
`

const LinkBox = styled.div`
	position: absolute;
	bottom: 10px;
	right: 10px;
`

const hobbyImages: HobbyImage[] = [
	{
		href: 'http://elzup.tumblr.com/post/94053042729/hill-home',
		src:
			'https://78.media.tumblr.com/96beaf0b70a8c3243b330258e1c2234a/tumblr_mju3wk5R9M1s8i4rbo1_540.png',
	},
	{
		href: 'http://elzup.tumblr.com/post/94053031074/underground-church',
		src:
			'https://78.media.tumblr.com/9001a99623807ab9256c74a0ceeb0e02/tumblr_mju3qz2Qh41s8i4rbo4_540.png',
	},
	{
		href: 'http://elzup.tumblr.com/post/94061387089/screw-cube',
		src:
			'https://78.media.tumblr.com/a762d2eb61576016d07652950699ed06/tumblr_n9xs891xSC1ttrer8o1_640.jpg',
	},
]

const HobbyGallery = (props: Props) => (
	<Wrapper>
		<GridFrame>
			{hobbyImages.map((hi, i) => (
				<Box key={i}>
					<Image src={hi.src} alt="" />
					<LinkBox>
						<LinkButton href={hi.href} />
					</LinkBox>
				</Box>
			))}
		</GridFrame>
	</Wrapper>
)
export default HobbyGallery
