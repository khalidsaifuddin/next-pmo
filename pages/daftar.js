import React, { Component } from 'react'
import Head from 'next/head'
import { Form, Checkbox, Button, Card, Grid, Icon, Divider } from 'semantic-ui-react'
import '../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import LayoutNoMenu from './components/LayoutNomenu'
import Navbar from './components/Navbar'
import { withRouter } from 'next/router'
import GoogleLogin from 'react-google-login'

class Daftar extends Component {
  state = {
    check_terms: false,
    params: {
      password: null,
      ulangi_password: null
    }
  }

  checkTerms = () => {
    this.setState({
      check_terms: !this.state.check_terms
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

  render() {
    return (
      <div className="container">
        <Head>
          <title>KitaCerita - Daftar Pengguna Baru</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar searchbar={false} loginButton={false} />
        <LayoutNoMenu>

              <Grid>
                <Grid.Column computer={2} only='computer'>
                </Grid.Column>
                <Grid.Column computer={12} mobile={16} tablet={16}>
                  
                  <Card centered fluid raised>
                    <Card.Content>
                      <Grid relaxed='very'>
                        <Grid.Column computer={8} tablet={16} mobile={16}>
                          <Form style={{textAlign:'left', marginBottom:'32px', marginTop:'32px'}} size={'large'}>
                            <h2>Daftar Pengguna Baru</h2>
                            <Form.Field>
                              <label>Nama</label>
                              <input placeholder='Nama...' />
                            </Form.Field>
                            <Form.Field>
                              <label>Email</label>
                              <input placeholder='Email...' />
                            </Form.Field>
                            <Form.Field>
                              <label>No.HP</label>
                              <input placeholder='No.HP...' />
                            </Form.Field>
                            <Form.Field error={(!this.state.params.password || this.state.params.password === '' ? true : false)}>
                              <label>Password</label>
                              <input placeholder='Password...' type='password' onChange={this.setValue('password')} />
                            </Form.Field>
                            <Form.Field error={(this.state.params.password !== this.state.params.ulangi_password ? true : false)}>
                              <label>Ulangi Password</label>
                              <input placeholder='Ulangi Password...' type='password' onChange={this.setValue('ulangi_password')} />
                            </Form.Field>
                            <Form.Field>
                              <Checkbox onClick={this.checkTerms} checked={this.state.check_terms} label='Dengan mendaftar, Saya setuju dengan syarat dan ketentuan yang berlaku' />
                            </Form.Field>
                            <br/>
                            <Button circular disabled={!this.state.check_terms} className="bawahCiri" size={'large'} fluid type='submit' color='violet' style={{display:'inline-flex', justifyContent:'center'}}>
                              <Icon name="sign in alternate" style={{fontSize:'18px'}} />
                              Daftar
                            </Button>
                          </Form>
                        </Grid.Column>
                        <Grid.Column computer={8} tablet={16} mobile={16} style={{paddingTop:'48px'}}>
                          <GoogleLogin
                            className="googleLogin"
                            clientId={'582957663393-kp55jbquet0m0rlkkkskrahm2ruq8dfc.apps.googleusercontent.com'}
                            buttonText="Daftar dengan Google"
                            // onSuccess={this.responseGoogle}
                            // onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            // style={{textAlign:'center', width:'100%', borderRadius:'20px'}}
                            style={{textAlign:'center', width:'100%', borderRadius:'20px'}}
                          />
                          <div style={{textAlign:'center'}}>
                            <Divider style={{marginTop:'48px', marginBottom:'16px'}} />
                            <div>
                              Sudah punya akun? <a href="/login"><b>Login di sini</b></a>
                            </div>
                          </div>
                        </Grid.Column>
                      </Grid>
                      <Divider vertical>Atau</Divider>
                    </Card.Content>
                  </Card>

                </Grid.Column>
                <Grid.Column computer={2} only='computer'>
                </Grid.Column>
              </Grid>

        </LayoutNoMenu>
      </div>
    )
  }
}

export default withRouter(Daftar)

// export default function Beranda() {
//   return (
//     <Layout>
//       isinya beranda
//     </Layout>
//   )
// }