import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import { responsiveImages } from './integrations/responsive-images'

export default defineConfig({
	integrations: [responsiveImages(), icon()],
})
