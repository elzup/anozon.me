import type { Category, Product, HobbyImage } from '../types'

export const products: Product[] = [
	{
		title: 'elzup.com',
		url: 'https://elzup.com',
		urlLive: true,
		description: '大学時代の自分跡地',
		filename: 'elzup.png',
		tags: ['React', 'flow'],
	},
	{
		title: 'uniballoon',
		url: 'https://uniballoon.com',
		urlLive: false,
		description: 'アイデア共有サイト',
		filename: 'uniballoon.png',
		tags: ['Rails', 'React'],
	},
	{
		title: 'another-node',
		url: 'https://anozon.me',
		urlLive: true,
		description: 'このサイト',
		filename: 'another-node.png',
		tags: ['astro', 'Next.js', 'React', 'TypeScript'],
	},
	{
		title: 'anozonblog',
		url: 'https://blog.anozon.me',
		urlLive: true,
		description: 'GatsbyJS と TypeScriptで作ったブログ',
		filename: 'anozonblog.png',
		tags: ['GatsbyJS', 'React', 'TypeScript'],
	},
	{
		title: 'nozctf',
		url: 'https://nozctf.web.app',
		urlLive: true,
		description: 'Firebase で作った web 問題 CTF サイト',
		filename: 'nozctf.png',
		tags: ['Next.js', 'React', 'TypeScript'],
	},
	{
		title: 'Mitelop',
		url: 'https://mitelop.anozon.me/',
		urlLive: true,
		description: '配信向けガジェット',
		filename: 'mitelop.png',
		tags: ['Next.js', 'React', 'TypeScript', 'PWA'],
	},
]

export const categories: Category[] = [
	{
		name: 'ゲーム',
		hobbies: [
			{
				name: 'Minecraft',
				notes: [
					{ text: '@elzup' },
					{ text: '建築勢' },
					{
						href: 'https://anozon10.tumblr.com/tagged/minecraft',
						text: '作品',
					},
				],
			},
			{
				name: 'Splatoon2',
				notes: [
					{ text: '持ち武器: N-ZAP95, H3Dリールガン, ジェッカス' },
					{ text: '全ルールX2500~X2553,最終王冠' },
					{
						href: 'https://anozon10.tumblr.com/tagged/splatoon2',
						text: '思い出',
					},
				],
			},
			{
				name: 'VRChat',
				notes: [
					{
						href: 'https://vrchat.net/home/user/usr_806a199f-824d-44ae-9bd2-d77d41862efb',
						text: 'anozon',
					},
				],
			},
			{ name: 'ネクロダンサー' },
			{ name: 'factorio' },
			{
				name: 'Steam ID',
				notes: [
					{ href: 'https://steamcommunity.com/id/elzup/', text: 'elzup' },
				],
			},
			{
				name: '---',
				notes: [
					{
						href: 'https://anozon10.tumblr.com/tagged/game',
						text: 'その他実績',
					},
				],
			},
		],
	},
	{
		name: 'パズル',
		hobbies: [
			{
				name: 'ルービックキューブ',
				notes: [
					{
						href: "http://elzup.tumblr.com/tagged/rubick's%20cube",
						text: 'パターンキューブ作品',
					},
				],
			},
			{
				name: 'パズルゲーム',
				notes: [
					{
						href: 'https://anozon10.tumblr.com/tagged/puzzle',
						text: 'スマホゲー',
					},
				],
			},
			{
				name: 'ペンシルパズル',
				notes: [{ text: 'スリザーリンク好き' }, { text: 'ニコリのパズル' }],
			},
		],
	},
	{
		name: 'ボドゲ',
		hobbies: [
			{ name: 'オセロ' },
			{
				name: '将棋',
				notes: [
					{
						href: 'https://shogiwars.heroz.jp/users/elzup',
						text: '将棋ウォーズ',
					},
				],
			},
		],
	},
	{
		name: 'アニメ',
		hobbies: [
			{ name: 'コードギアス' },
			{ name: '進撃の巨人' },
			{ name: '亜人' },
			{ name: 'キノの旅' },
			{
				name: 'Annict',
				notes: [
					{
						href: 'https://annict.jp/@elzup',
						text: '@elzup',
					},
					{
						href: 'https://annict.jp/@elzup/tags/%E2%98%85%E2%98%85%E2%98%85%E2%98%85%E2%98%85',
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
		],
	},
	{
		name: 'コード',
		hobbies: [
			{ name: 'JavaScript' },
			{ name: 'Vim' },
			{ name: '競プロ' },
			{ name: 'CTF' },
			{
				name: '---',
				notes: [
					{
						href: 'https://github.com/elzup/DesktopStickers',
						text: '好きな技術',
					},
					{
						href: 'https://github.com/elzup/dotfiles',
						text: 'dotfiles',
					},
				],
			},
		],
	},
]

export const hobbyImages: HobbyImage[] = [
	{
		href: 'http://elzup.tumblr.com/post/94053042729/hill-home',
		src: 'https://78.media.tumblr.com/96beaf0b70a8c3243b330258e1c2234a/tumblr_mju3wk5R9M1s8i4rbo1_400.png',
	},
	{
		href: 'http://elzup.tumblr.com/post/94053031074/underground-church',
		src: 'https://78.media.tumblr.com/9001a99623807ab9256c74a0ceeb0e02/tumblr_mju3qz2Qh41s8i4rbo4_400.png',
	},
	{
		href: 'https://anozon10.tumblr.com/post/177571882212/n-zap-%E9%87%91%E6%97%97',
		src: 'https://78.media.tumblr.com/ab2ed8a26b0dbdd22e0ee433676c1c1b/tumblr_peayivCR3W1xe6l2po2_r1_400.jpg',
	},
	{
		href: 'http://elzup.tumblr.com/post/94061387089/screw-cube',
		src: 'https://78.media.tumblr.com/a762d2eb61576016d07652950699ed06/tumblr_n9xs891xSC1ttrer8o1_640.jpg',
	},
]
