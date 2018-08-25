// @flow
import * as React from 'react'
import Screen from '../Screen'

type Props = {}

const HobbyScreen = (props: Props) => {
	return (
		<Screen id="hobby" title="Hobby" description="趣味">
			<div>
				<h3>ゲーム</h3>
				<p>ハマったもの。</p>
				Minecraft, Splatoon2など作品や実績 Tumblr
				<h3>ボードゲーム</h3>
				オセロ, 将棋
				<h3>アニメ</h3>
				<p>たくさん見てる。</p>
				特に好き: コードギアス、進撃の巨人、亜人、キノの旅
				https://annict.jp/@elzup/watched
			</div>
		</Screen>
	)
}

export default HobbyScreen
