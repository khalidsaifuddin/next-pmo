import React, { Component } from 'react'
import main from './_app'
import { Grid } from 'semantic-ui-react'
import '../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import Layout from './components/Layout'
import { withRouter } from 'next/router'
import * as AppActions from '../store/actions/app.actions'
import * as CeritaActions from '../store/actions/cerita.actions'
import * as KategoriActions from '../store/actions/kategori.actions'
import config from '../config'

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
      <Layout>
        isi beranda
      </Layout>
    )
  }
}

export default withRouter(Beranda)