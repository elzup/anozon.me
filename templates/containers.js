// @flow
import * as React from 'react'
import { connect, type Connector } from 'react-redux'
import type { State as RootState } from '../../types'
import * as selectors from './selectors'

type Props = {}

class <%= DIRNAME %> extends React.Component<Props> {
  render() {
    const {props} = this.props
    return <div>{JSON.stringify(props)}</div>
  }
}

const ms = (state: RootState) => ({
  TODO: selectors.TODO,
})

const conn: Connector<{}, Props> = connect(ms, { TODO })

export default conn(<%= DIRNAME %>)
