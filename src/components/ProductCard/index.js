// @flow
import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const hilight = keyframes`
0% {
	background: white;
}

100% {
	background: #eee;
}
`

export type Product = {
	title: string,
	url: string,
	description: string,
	filename: string,
}
const Wrapper = styled.a`
	position: relative;
	padding-top: 15px;
	&:before {
		position: absolute;
		top: 0.5em;
		left: -0.5em;
		content: '⬢';
	}
	&:after {
		position: absolute;
		bottom: -0.5em;
		right: -0.5em;
		content: '⬢';
	}
	&:hover {
		animation: ${hilight} 0.5s ease 0s forwards;
	}
`

const Card = styled.div`
	width: 300px;
	text-align: center;
	margin-top: 20px;
	border: dashed #dcdcdc 1px;
	padding: 5px;
	img {
		width: 95%;
		border-radius: 5px;
	}
`

type Props = {
	product: Product,
}

const ProductCard = ({ product }: Props) => {
	return (
		<Wrapper href={product.url} target="_blank" rel="noopener noreferrer">
			<Card>
				<img src={`/imgs/${product.filename}`} alt={product.title} />
				<h4>{product.title}</h4>
				<p>{product.description}</p>
			</Card>
		</Wrapper>
	)
}

export default ProductCard
