// @flow
import * as React from 'react'
import styled from 'styled-components'

import Screen from '../Screen'
import LinkButton from '../LinkButton'

type Props = {}

const Table = styled.table`
	td {
		height: 60px;
	}
`

const Name = styled.th`
	width: 5em;
	border-right: solid;
`

const HobbyScreen = (props: Props) => (
	<Screen id="hobby" title="Hobby" description="趣味">
		<div>
			<Table>
				<tr>
					<Name>ゲーム</Name>
					<td>Minecraft, Splatoon2</td>
					<td>
						<LinkButton
							href="https://elzup.tumblr.com/tagged/minecraft"
							text="Minecraft作品"
						/>
						<LinkButton
							href="https://anozon10.tumblr.com/tagged/game"
							text="ゲーム実績"
						/>
					</td>
				</tr>
				<tr>
					<Name>パズル</Name>
					<td>ルービックキューブ, パズルゲーム, ペンシルパズル</td>
					<td />
				</tr>
				<tr>
					<Name>ボドゲ</Name>
					<td>オセロ, 将棋</td>
					<td />
				</tr>
				<tr>
					<Name>アニメ</Name>
					<td>コードギアス、進撃の巨人、亜人、キノの旅</td>
					<td>
						<LinkButton
							href="https://annict.jp/@elzup/watched"
							text="見たアニメ"
						/>
						<LinkButton
							href="https://annict.jp/@elzup/TODO"
							text="好きなアニメ"
						/>
					</td>
				</tr>
			</Table>
		</div>
	</Screen>
)

export default HobbyScreen
