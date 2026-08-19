/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

// getViteConfig を使うと astro.config.mjs の integrations (astro-icon など) が
// そのまま効くので、コンポーネントを本番と同じ解決で render できる
export default getViteConfig({
	test: {
		environment: 'happy-dom',
		include: ['src/**/*.test.ts'],
	},
})
