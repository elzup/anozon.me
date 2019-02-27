import * as React from 'react'
import Screen from '../Screen'

import ProductGallery from './ProductGallery'

type Props = {}

const WorkScreen = (props: Props) => {
	return (
		<Screen id="work" title="Works" description="作ったもの">
			<ProductGallery />
		</Screen>
	)
}

export default WorkScreen
