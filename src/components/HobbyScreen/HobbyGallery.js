// @flow

import * as React from 'react'
import styled from 'styled-components'
import { GridFrame } from '../'

import LinkButton from '../LinkButton'

import { hobbyImages } from '../../api/data'

type Props = {}

const Wrapper = styled.div`
	display: flex;
	margin-top: 15px;
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
