import styled, { keyframes } from 'styled-components'

import { Product } from '../../types'

const hilight = keyframes`
0% {
	background: white;
}

100% {
	background: #eee;
}
`

const Wrapper = styled.a`
	position: relative;
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
`

const Card = styled.div`
	width: 300px;
	text-align: center;
	background: #ffffffb0;
	margin-top: 20px;
	border: dashed #dcdcdc 1px;
	padding: 5px;
	> div {
		height: 200px;
	}
	img {
		width: 95%;
		height: 95%;
		object-fit: contain;
		border-radius: 5px;
	}
	&:hover {
		animation: ${hilight} 0.5s ease 0s forwards;
	}
`

type Props = {
	product: Product
}

const ProductCard = ({ product }: Props) => {
	return (
		<Wrapper href={product.url} target="_blank" rel="noopener noreferrer">
			<Card>
				<div>
					<img src={`/static/${product.filename}`} alt={product.title} />
				</div>
				<h4>{product.title}</h4>
				<p>{product.description}</p>
			</Card>
		</Wrapper>
	)
}

export default ProductCard
