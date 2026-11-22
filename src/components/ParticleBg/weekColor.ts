// 曜日テーマの色。正本は elzup/blueprint-theme の src/tokens.ts (Blueprint Contrast の dark と `DAYS` の dark 側)。
// blueprint-theme は未公開で package として引けないので値を写している。向こうを変えたらここも合わせる。
// 曜日テーマは「accent だけ曜日色に替え、下地・文字・意味色は固定」なので、粒子もその組で塗る
export const THEME = {
	bg: '#000000',
	text: '#ffffff',
	brand: '#5cc8ff', // 曜日で変えない元の accent
	green: '#3dff8f',
	red: '#ff5050',
	orange: '#ffc400',
	violet: '#c99bff',
} as const

type ThemeRole = Exclude<keyof typeof THEME, 'bg'>

type DayTheme = {
	color: string
	// 曜日色と並べると見分けにくいテーマ色。粒子の種類からは外す
	clash?: ThemeRole
}

// getDay() 順 (0 = 日曜)
export const DAY_THEMES: readonly DayTheme[] = [
	{ color: '#ff9a3c', clash: 'orange' }, // 日 橙 (太陽)
	{ color: '#9fa8ff', clash: 'violet' }, // 月 藍 (月光)
	{ color: '#ff4f7b', clash: 'red' }, // 火 紅
	{ color: '#2ee0ff', clash: 'brand' }, // 水 シアン
	{ color: '#9be33a', clash: 'green' }, // 木 若葉
	{ color: '#ffd23f', clash: 'orange' }, // 金 山吹
	{ color: '#ac7e56' }, // 土 土色
]

// 曜日色の次に並べる順。draw-style は種類ごとなので、この順で描き方が割り当たる
const ROLE_ORDER: readonly ThemeRole[] = ['brand', 'green', 'red', 'orange', 'violet', 'text']

/**
 * 粒子の種類ごとの色。0 番 (main) が今日の曜日色、残りはその日のテーマ色を 1 種 1 色で。
 * 曜日色とぶつかるテーマ色は外すので、種類数は曜日により 6 か 7
 */
export const weekTypeColors = (date: Date = new Date()): string[] => {
	const day = DAY_THEMES[date.getDay()] ?? DAY_THEMES[0]
	const others = ROLE_ORDER.filter((role) => role !== day.clash).map((role) => THEME[role])
	return [day.color, ...others]
}
