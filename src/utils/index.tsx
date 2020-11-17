/* eslint-disable react/display-name */
import React from 'react'

if (typeof window !== 'undefined') {
	require('css-doodle')
}

export function sleep(msec: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, msec))
}

export const cssDoodle = ([rule = '']: TemplateStringsArray): React.FC<{
	style?: unknown
	// @ts-ignore
}> => (props) => <css-doodle {...props}>{rule}</css-doodle>
