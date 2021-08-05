import React, { Component } from 'react'
import Head from 'next/head'
import main from '../_app'
import { Grid } from 'semantic-ui-react'
import '../../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import LayoutNoMenu from '../components/LayoutNomenu'
import { withRouter } from 'next/router'
import config from '../../config'
import NavbarSimple from '../components/NavbarSimple'

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
      <div className="container">
        <Head>
          <title>Form PMO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavbarSimple />
        <LayoutNoMenu>
          <h3>Form Pengelola Program Management Office</h3>
        </LayoutNoMenu>
      </div>
    )
  }
}

export default withRouter(Beranda)