import React, { Component } from 'react'
import main from './_app'
import { Card, Grid } from 'semantic-ui-react'
import '../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from './components/Layout'
import { withRouter } from 'next/router'
import * as AppActions from '../store/actions/app.actions'
import * as CeritaActions from '../store/actions/cerita.actions'
import * as KategoriActions from '../store/actions/kategori.actions'
import config from '../config'
import LayoutNoMenu from './components/LayoutNomenu'

class Beranda extends Component {
  
  state = {
    loading: true,
    params: {
      foo: 'bar'
    },
    arrLoading: [1,2,3,4]
  }

  gradient = [
    '#757575',
    '#757575',
    '#757575',
    '#757575',
    '#757575',
    '#757575',
    '#757575',
    '#757575'
  ]

  loadInitialData = () => {
    
  }

  componentDidMount = () => {
    this.loadInitialData()
  }

  render() {
    return (
      <LayoutNoMenu>
        <h1>Aplikasi PMO</h1>
        <a href="/form/pmo">
          <Card>
            <Card.Content>
              Form Pengelola PMO
            </Card.Content>
          </Card>
        </a>
      </LayoutNoMenu>
    )
  }
}

export default withRouter(Beranda)