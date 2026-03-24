import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import partytown from '@astrojs/partytown'
import icon from 'astro-icon'

export default defineConfig({
	integrations: [
		react(),
		partytown({
			config: {
				forward: ['dataLayer.push'],
			},
		}),
		icon(),
	],
})
