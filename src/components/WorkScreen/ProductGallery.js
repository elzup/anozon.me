// @flow

import * as React from 'react'
import styled from 'styled-components'
import { GridFrame } from '../'

import ProductCard, { type Product } from '../ProductCard'

const products: Product[] = [
	{
		title: 'elzup.com',
		url: 'https://elzup.com',
		description: '大学時代の自分跡地',
		filename: 'elzup.png',
		tags: ['React'],
	},
	{
		title: 'uniballoon',
		url: 'https://uniballoon.com',
		description: 'アイデア共有サイト',
		filename: 'uniballoon.png',
		tags: ['Rails', 'React'],
	},
	{
		title: 'another-node',
		url: 'https://anozon.me',
		description: 'このサイト',
		filename: 'another-node.png',
		tags: ['React', 'Redux'],
	},
]

type Props = {}

const Wrapper = styled.div`
	display: flex;
`

const ProductGallery = (props: Props) => (
	<Wrapper>
		<GridFrame>
			{products.map(product => (
				<ProductCard key={product.filename} product={product} />
			))}
		</GridFrame>
	</Wrapper>
)
export default ProductGallery
