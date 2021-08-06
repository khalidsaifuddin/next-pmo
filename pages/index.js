import React, {Component} from 'react'
import Head from 'next/head'
import Beranda from './beranda'
import Navbar from './components/Navbar'
import localforage from 'localforage'
import cekLogin from '../functions/app_functions'
import NavbarSimple from './components/NavbarSimple'

// export default function Home() {
class Home extends Component {

  state = {
    pengguna: {}
  }

  // cekLogin = () => {
  //   localforage.getItem('sudah_login', (err, value)=>{
  //     if(value === 1){
  //       //sudah login
  //       this.setState({
  //         sudah_login: 1
  //       },()=>{
  //         localforage.getItem('pengguna', (err, value)=>{
  //           // console.log(value)
  //           this.setState({
  //             pengguna: value
  //           },()=>{
  //             // console.log(this.state.sudah_login)
  //             // console.log(this.state.pengguna)
  //           })
  //         })
  //       })
  //     }else{
  //       //belum login
  //     }
  //   })
  // }
  
  componentDidMount = () => {
    // console.log(localforage.getItem('pengguna'))
    // const pengguna = await localforage.getItem('pengguna')
    // this.cekLogin()

    cekLogin().then((value)=>{
      // console.log(value)

      this.setState({
        ...this.state,
        ...value
      })
    })
    
  }

  render(){
    return (
      <div className="container">
        <Head>
          <title>PMO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavbarSimple searchbar={true} loginButton={true} />
        <Beranda />
      </div>
    )
  }

}

export default Home
