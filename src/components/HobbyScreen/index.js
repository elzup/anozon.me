// @flow
import * as React from 'react'
import Screen from '../Screen'

type Props = {}

const HobbyScreen = (props: Props) => {
	return (
		<Screen id="hobby" title="Hobby" description="趣味">
			<div>
				<table>
					<tr>
						<th>ゲーム</th>
						<td>Minecraft, Splatoon2, パズルゲーム</td>
					</tr>
					<tr>
						<th>アニメ</th>
						<td>
							コードギアス、進撃の巨人、亜人、キノの旅
							https://annict.jp/@elzup/watched
						</td>
					</tr>
				</table>
			</div>
		</Screen>
	)
}

export default HobbyScreen
