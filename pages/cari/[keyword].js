import React, { Component } from 'react'
import Head from 'next/head'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { withRouter } from 'next/router'

class Keyword extends Component {
  state = {
    loading: false
  }

  componentDidMount = () => {
    // const { router } = this.props
    // console.log(this.props.router.events)
    // console.log(this.props.router.events.on)
    // console.log(this.props.url.query)

    this.props.router.events.on('routeChangeComplete',()=>{
      // console.log(this.props.router.query.keyword)
      this.setState({
        params:{
          ...this.state.params,
          keyword: this.props.router.query.keyword
        }
      })
    })
    
  }

  render() {
    const { router } = this.props

    return (
      <div className="container">
        <Head>
          <title>KitaCerita - Cari {router.query.keyword}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Layout>
          Hasil Pencarian "<b>{router.query.keyword}</b>"
        </Layout>
      </div>
    )
  }
}

export default withRouter(Keyword)

// export default function Beranda() {
//   return (
//     <Layout>
//       isinya beranda
//     </Layout>
//   )
// }