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
	@media (max-width: 650px) {
		font-size: 0.8em;
	}
`

const Name = styled.th`
	width: 5em;
	border-right: solid;
`

type Link = {
	href: string,
	text: string,
}

type Category = {
	category: string,
	description: string,
	links: Link[],
}

const hobbies: Category[] = [
	{
		category: 'ゲーム',
		description: 'Minecraft, Splatoon2, VRChat, ネクロダンサー',
		links: [
			{
				href: 'https://elzup.tumblr.com/tagged/minecraft',
				text: 'Minecraft作品',
			},
			{
				href: 'https://anozon10.tumblr.com/tagged/game',
				text: 'ゲーム実績',
			},
		],
	},
	{
		category: 'パズル',
		description: 'ルービックキューブ, パズルゲーム, ペンシルパズル',
		links: [
			{
				href: "http://elzup.tumblr.com/tagged/rubick's%20cube",
				text: 'パターンキューブ作品',
			},
		],
	},
	{
		category: 'ボドゲ',
		description: 'オセロ, 将棋',
		links: [
			{
				href: 'https://shogiwars.heroz.jp/users/elzup',
				text: '将棋ウォーズ3級',
			},
		],
	},
	{
		category: 'アニメ',
		description: 'コードギアス、進撃の巨人、亜人、キノの旅',
		links: [
			{
				href: 'https://annict.jp/@elzup/watched',
				text: '見たアニメ',
			},
			{
				href: 'https://annict.jp/@elzup/TODO',
				text: '好きなアニメ',
			},
			{
				href: 'https://elzup.tumblr.com/tagged/yome',
				text: '嫁',
			},
		],
	},
]

const HobbyScreen = (props: Props) => (
	<Screen id="hobby" title="Hobby" description="趣味">
		<div>
			<Table>
				{hobbies.map(hobby => (
					<tr>
						<Name>{hobby.category}</Name>
						<td>{hobby.description}</td>
						<td>
							{hobby.links.map(link => (
								<LinkButton href={link.href} text={link.text} />
							))}
						</td>
					</tr>
				))}
			</Table>
		</div>
	</Screen>
)

export default HobbyScreen
