// @flow
import * as React from 'react'
import styled from 'styled-components'
import Screen from '../Screen'
import ProductCard, { type Product } from '../ProductCard'

const Products = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`

type Props = {}

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

const WorkScreen = (props: Props) => {
	return (
		<Screen id="work" title="Works" description="作ったもの">
			<Products>
				{products.map(product => (
					<ProductCard product={product} />
				))}
			</Products>
		</Screen>
	)
}

export default WorkScreen
