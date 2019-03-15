import * as React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import LinkButton from '../LinkButton'

import { hobbyImages } from '../../api/data'

type Props = {}

const Wrapper = styled.div`
	display: flex;
	margin-top: 15px;
	min-height: 350px;
`

const Box = styled.div`
	position: relative;
	float: left;
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
		<div>
			{hobbyImages.map((hi, i) => (
				<Box key={i}>
					<LazyLoad>
						<Image src={hi.src} alt="" />
					</LazyLoad>
					<LinkBox>
						<LinkButton href={hi.href} />
					</LinkBox>
				</Box>
			))}
		</div>
	</Wrapper>
)
export default HobbyGallery
