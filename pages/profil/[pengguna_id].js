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
import CardPenulis from '../components/cardPenulis'

class Profil extends Component {
  state = {
    loading: true,
    params: {},
    pengguna: {},
    selfProfile: false
  }

  componentDidMount = () => {
    
    this.props.router.events.on('routeChangeComplete',()=>{
      cekLogin().then((value)=>{
  
        this.setState({
          ...this.state,
          ...value
        },()=>{
          let selfProfile = false
    
          if(this.state.sudah_login === 1 && this.props.router.query.pengguna_id === this.state.pengguna.pengguna_id){
            selfProfile = true
          }
    
          this.setState({
            params:{
              ...this.state.params,
              pengguna_id: this.props.router.query.pengguna_id
            },
            selfProfile: selfProfile
          },()=>{
            
            AppActions.getPengguna(this.state.params, config.api_base).then((result)=>{
              console.log(result.data.rows)
    
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
    const { pengguna, loading, selfProfile } = this.state

    return (
      <div className="container">
        <Head>
          <title>KitaCerita - Profil {router.query.pengguna_id}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Layout>
          {/* Profil "<b>{router.query.pengguna_id}</b>" */}
          {loading && 
          <Placeholder>
            <Placeholder.Line length='medium' />
          </Placeholder>
          }
          {!loading &&
          <>
            <CardPenulis penulis={pengguna} withoutHeader selfProfile={selfProfile} />
          </>
          }

        </Layout>
      </div>
    )
  }
}

export default withRouter(Profil)