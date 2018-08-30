// @flow
import * as React from 'react'
import styled from 'styled-components'

import Screen from '../Screen'
import LinkButton from '../LinkButton'

import HobbyGallery from './HobbyGallery'

type Props = {}

const Table = styled.table`
	td {
		height: 80px;
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
				href:
					'https://annict.jp/@elzup/tags/%E2%98%85%E2%98%85%E2%98%85%E2%98%85%E2%98%85',
				text: '超好きなアニメ',
			},
			{
				href: 'https://annict.jp/@elzup/watched',
				text: '見たアニメ',
			},
			{
				href: 'https://anozon10.tumblr.com/tagged/yome',
				text: '嫁',
			},
		],
	},
	{
		category: 'コード',
		description: 'JavaScript, Vim, 競プロ, CTF',
		links: [
			{
				href: 'https://github.com/elzup/DesktopStickers',
				text: '好きな技術',
			},
			{
				href: 'https://github.com/elzup/dotfiles',
				text: 'dotfiles',
			},
			{
				href: 'https://github.com/elzup/Brewfile',
				text: 'Brewfile',
			},
		],
	},
]

const HobbyScreen = (props: Props) => (
	<Screen id="hobby" title="Hobby" description="趣味">
		<div>
			<Table>
				<tbody>
					{hobbies.map(hobby => (
						<tr key={hobby.category}>
							<Name>{hobby.category}</Name>
							<td>{hobby.description}</td>
							<td>
								{hobby.links.map(link => (
									<LinkButton
										key={link.href}
										href={link.href}
										text={link.text}
									/>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
		<HobbyGallery />
	</Screen>
)

export default HobbyScreen
