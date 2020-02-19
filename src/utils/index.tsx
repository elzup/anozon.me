import React from 'react'
/* eslint-disable-next-line */
if (typeof window !== 'undefined') {
	require('css-doodle')
}

export function sleep(msec: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, msec))
}

export const cssDoodle = ([rule = '']: TemplateStringsArray): React.SFC<{
	style?: unknown
	/* eslint-disable-next-line */
	// @ts-ignore
}> => props => <css-doodle {...props}>{rule}</css-doodle>
