// @flow

import { connect } from 'react-redux'
import NavBar from '../../components/NavBar'
import type { State } from '../../types'
import { doLogout } from '../AuthContainer/logic'
import { downloadReport } from './logic'

const ms = (state: State) => ({})

const conn = connect(ms, { doLogout, handleReport: downloadReport })

export default conn(NavBar)
