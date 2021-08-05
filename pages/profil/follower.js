import React, { Component } from 'react'
import Head from 'next/head'
import { Grid, Placeholder } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { withRouter } from 'next/router'
import config from '../../config'
import * as AppActions from '../../store/actions/app.actions'
import cekLogin from '../../functions/app_functions'
import getParameterByName from '../../functions/param_function'

class Follower extends Component {
  state = {
    loading: true,
    params: {},
    pengguna: {}
  }

  componentDidMount = () => {
    
    this.props.router.events.on('routeChangeComplete',()=>{
      cekLogin().then((value)=>{
        this.setState({
          ...this.state,
          ...value
        },()=>{
          this.setState({
            params:{
              ...this.state.params,
              pengguna_id: getParameterByName('pengguna_id', this.props.router.asPath)
            }
          },()=>{
            AppActions.getPengguna(this.state.params, config.api_base).then((result)=>{
              if(result.data.result > 0){
                this.setState({
                  loading: false,
                  pengguna: result.data.rows[0]
                })
              }
            })
          })
        })
      })
    })

  }

  render() {
    const { router } = this.props
    const { pengguna, loading } = this.state

    return (
      <div className="container">
        <Head>
          <title>KitaCerita - Follower {router.query.pengguna_id}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Layout>
          Pengikut <a href={"/profil/"+pengguna.pengguna_id}><b>{pengguna.nama}</b></a>
        </Layout>
      </div>
    )
  }
}

export default withRouter(Follower)