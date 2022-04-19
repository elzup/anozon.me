import { GA_TRACKING_ID } from '../config'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (page_path: string) => {
	// @ts-ignore
	window.gtag('config', GA_TRACKING_ID, { page_path })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// @ts-ignore
export const event = ({ action, event_category, event_label, value }) => {
	// @ts-ignore
	window.gtag('event', action, { event_category, event_label, value })
}
