import React from 'react'
import 'css-doodle'

export function sleep(msec: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, msec))
}

export const cssDoodle = ([rule = '']: TemplateStringsArray): React.SFC<
	unknown
> => props => <css-doodle {...props}>{rule}</css-doodle>
