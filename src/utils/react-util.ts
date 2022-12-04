import { PropsWithChildren, useState } from 'react'

export type WithChild<P = {}> = PropsWithChildren<P>

export const useOnce = <S>(fn: () => S) => useState(fn)[0]
