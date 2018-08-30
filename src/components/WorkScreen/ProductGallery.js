// @flow

import * as React from 'react'
import styled from 'styled-components'
import { GridFrame } from '../'

import ProductCard from '../ProductCard'

import { products } from '../../api/data'
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
