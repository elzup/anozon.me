//@flow

import type { Category, Product, HobbyImage } from '../types'

export const products: Product[] = [
	{
		title: 'elzup.com',
		url: 'https://elzup.com',
		description: '大学時代の自分跡地',
		filename: 'elzup.png',
		tags: ['React'],
	},
	{
		title: 'uniballoon',
		url: 'https://uniballoon.com',
		description: 'アイデア共有サイト',
		filename: 'uniballoon.png',
		tags: ['Rails', 'React'],
	},
	{
		title: 'another-node',
		url: 'https://anozon.me',
		description: 'このサイト',
		filename: 'another-node.png',
		tags: ['React', 'Redux'],
	},
]
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

export const hobbyImages: HobbyImage[] = [
	{
		href: 'http://elzup.tumblr.com/post/94053042729/hill-home',
		src:
			'https://78.media.tumblr.com/96beaf0b70a8c3243b330258e1c2234a/tumblr_mju3wk5R9M1s8i4rbo1_540.png',
	},
	{
		href: 'http://elzup.tumblr.com/post/94053031074/underground-church',
		src:
			'https://78.media.tumblr.com/9001a99623807ab9256c74a0ceeb0e02/tumblr_mju3qz2Qh41s8i4rbo4_540.png',
	},
	{
		href: 'http://elzup.tumblr.com/post/94061387089/screw-cube',
		src:
			'https://78.media.tumblr.com/a762d2eb61576016d07652950699ed06/tumblr_n9xs891xSC1ttrer8o1_640.jpg',
	},
]
