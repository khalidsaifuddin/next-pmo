import React, { Component } from 'react'
import Head from 'next/head'
import { Form, Checkbox, Button, Card, Grid, Icon, Divider, Dimmer, Header } from 'semantic-ui-react'
import '../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import LayoutNoMenu from './components/LayoutNomenu'
import Navbar from './components/Navbar'
import { withRouter } from 'next/router'
import GoogleLogin from 'react-google-login';
import config from '../config'
import * as AppActions from '../store/actions/app.actions'
import localforage from 'localforage'

class Login extends Component {
  state = {
    check_terms: false,
    loading: false,
    dimmer: false,
    pesan_dimmer: '',
    pengguna: {},
    detik: 3,
    params: {
      username: null,
      password: null
    }
  }

  componentDidMount = () => {
    console.log(localStorage.getItem('api_base'))
  }

  doLogin = () => {
    this.setState({
      loading: true
    },()=>{
      AppActions.login(this.state.params, config.api_base).then((result)=>{
        console.log(result)
        this.setState({
          loading: false,
        },()=>{
          // console.log(this.state.pengguna)

          if(result.status === 200 && result.data.sukses){
            //berhasil
            this.setState({
              dimmer: true,
              pesan_dimmer: 'Selamat Datang, '+result.data.rows.nama + '!',
              pengguna: result.data.rows
            },()=>{

              // console.log(result.data.rows)
              localforage.setItem('sudah_login', 1).then(()=>{

                localforage.setItem('pengguna', result.data.rows).then(() => {
                  // return localforage.getItem('pengguna')
                  // localforage.getItem('pengguna',(err, value)=>{
                    
                  // })
                  setInterval(() => {
                    this.setState({
                      detik: this.state.detik-1
                    })
                  }, 1000)
    
                  setTimeout(() => {
                    clearInterval()
                    window.location.href="/"
                  }, 3000)
  
                }).catch((err) => {
                  // we got an error
                })

              })


              // const value = await localforage.getItem('pengguna');


              // })
              //   console.log(localforage.getItem('pengguna'))
                


            })
          }else{
            //gagal
            this.setState({
              dimmer: true,
              pesan_dimmer: result.data.pesan
            })
          }

        })
      }).catch(()=>{
        console.log('error')
        this.setState({
          loading: false
        },()=>{
          
        })
      })
    })
  }

  setValue = (tipe) => (e) => {
    
    this.setState({
      params:{
        ...this.state.params,
        [tipe]: e.currentTarget.value
      }
    },()=>{
      console.log(this.state.params)
    })

  }

  handleDimmerClick = () => {
    this.setState({
      dimmer: false
    })
  }

  render() {
    return (
      <div className="container">
        <Dimmer active={this.state.dimmer} style={{zIndex:'999999'}} onClick={this.handleDimmerClick}>
          <Header as='h2' icon inverted>
            <Icon name='heart' />
            {this.state.pesan_dimmer}
            <br/>
            {this.state.detik}
          </Header>
        </Dimmer>
        <Head>
          <title>KitaCerita - Login Pengguna</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar searchbar={false} loginButton={false} />
        <LayoutNoMenu>

              <Grid>
                <Grid.Column computer={4} only='computer'>
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={16}>
                  <Card centered fluid raised>
                    <Card.Content style={{textAlign:'center'}}>
                      <h2>Login</h2>
                      <Form style={{textAlign:'center', marginBottom:'32px', marginTop:'32px'}} size={'large'} onSubmit={this.doLogin}>
                        <Form.Field>
                          <label>Email/No.HP/Username</label>
                          <input disabled={this.state.loading} placeholder='Email/No.HP/Username...' onChange={this.setValue('username')} />
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <input disabled={this.state.loading} placeholder='Password...' type='password' onChange={this.setValue('password')}/>
                        </Form.Field>
                        <br/>
                        <Button circular disabled={this.state.loading} loading={this.state.loading} className="bawahCiri" size={'large'} fluid type='submit' color='violet' style={{display:'inline-flex', justifyContent:'center'}}>
                          <Icon name="sign in alternate" style={{fontSize:'18px'}} />
                          Login
                        </Button>
                        
                        <Divider style={{marginTop:'32px', marginBottom:'32px'}} horizontal>Atau</Divider>
                        <GoogleLogin
                            disabled={this.state.loading}
                            className="googleLogin"
                            clientId={'582957663393-kp55jbquet0m0rlkkkskrahm2ruq8dfc.apps.googleusercontent.com'}
                            buttonText="Masuk dengan Google"
                            // onSuccess={this.responseGoogle}
                            // onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            // style={{textAlign:'center', width:'100%', borderRadius:'20px'}}
                            style={{textAlign:'center', width:'100%', borderRadius:'20px'}}
                        />
                        <Divider style={{marginTop:'48px', marginBottom:'16px'}} />
                        <div>
                          Belum punya akun? <a href="/daftar"><b>Daftar di sini</b></a>
                        </div>
                      </Form>
                    </Card.Content>
                  </Card>

                </Grid.Column>
                <Grid.Column computer={4} only='computer'>
                </Grid.Column>
              </Grid>

        </LayoutNoMenu>
      </div>
    )
  }
}

export default withRouter(Login)

// export default function Beranda() {
//   return (
//     <Layout>
//       isinya beranda
//     </Layout>
//   )
// }