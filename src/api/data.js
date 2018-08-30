//@flow

import type { Category } from '../types'

export const categories: Category[] = [
	{
		name: 'ゲーム',
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
		name: 'パズル',
		description: 'ルービックキューブ, パズルゲーム, ペンシルパズル',
		links: [
			{
				href: "http://elzup.tumblr.com/tagged/rubick's%20cube",
				text: 'パターンキューブ作品',
			},
		],
	},
	{
		name: 'ボドゲ',
		description: 'オセロ, 将棋',
		links: [
			{
				href: 'https://shogiwars.heroz.jp/users/elzup',
				text: '将棋ウォーズ3級',
			},
		],
	},
	{
		name: 'アニメ',
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
		name: 'コード',
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
