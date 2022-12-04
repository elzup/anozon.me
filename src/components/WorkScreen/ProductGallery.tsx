import styled from 'styled-components'
import { GridFrame } from '..'
import { products } from '../../api/data'
import ProductCard from '../ProductCard'

const Wrapper = styled.div`
	display: flex;
`

const ProductGallery = () => (
	<Wrapper>
		<GridFrame>
			{products.map((product) => (
				<ProductCard key={product.filename} product={product} />
			))}
		</GridFrame>
	</Wrapper>
)

export default ProductGallery
