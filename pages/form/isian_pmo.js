import React, { Component } from 'react'
import Head from 'next/head'
import main from '../_app'
import { Grid, Form, Dropdown, Card, Button, Icon, Modal, CardContent } from 'semantic-ui-react'
import '../../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import LayoutNoMenu from '../components/LayoutNomenu'
import { withRouter } from 'next/router'
import config from '../../config'
import NavbarSimple from '../components/NavbarSimple'
import * as RegistrationActions from '../../store/actions/registration.actions'
import * as AppActions from '../../store/actions/app.actions'
import getParameterByName from '../../functions/param_function'

class IsianPmo extends Component {
  
  state = {
    loading: true,
    params: {},
    sudah_submit: false,
    arrLoading: [1,2,3,4],
    registration:{},
    provinsi: [],
    kabupaten: [],
    modal_open: false
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
    RegistrationActions.getPendaftaran({id:getParameterByName('id', this.props.router.asPath)}, config.api_base).then((result)=>{
      this.setState({
        registration: result.data
      })
    })
  }

  componentDidMount = () => {

    console.log(window.location)

    this.setState({
      rootUrl: window.location.origin
    })

    this.loadInitialData()
  }

  render() {
    const { registration } = this.state

    console.log(registration)

    return (
      <div className="container">
        <Head>
          <title>Isian Form PMO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavbarSimple />
        <LayoutNoMenu>
          <h3>Pengelola Program Management Office</h3>
          <br/>
          <Form onSubmit={this.submitForm}>
            <Card fluid>
              <Card.Content>
                <Form.Field>
                  <label>Jenis Pengelola</label>
                  {registration.JenisPendaftaran && registration.JenisPendaftaran.Nama}
                </Form.Field>
                <Form.Field>
                  <label>Provinsi</label>
                  {registration.provinsi && registration.provinsi.nama}
                </Form.Field>
                {registration.jenis_pendaftaran_id === 2 &&
                <Form.Field>
                  <label>Kabupaten/Kota</label>
                  {registration.kabupaten && registration.kabupaten.nama}
                </Form.Field>
                }
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Form.Field>
                  <label>Nama</label>
                  {registration.nama ? registration.nama : '-'}
                </Form.Field>
                <Form.Field>
                  <label>Lembaga Asal</label>
                  {registration.lembaga_asal ? registration.lembaga_asal : '-'}
                </Form.Field>
                <Form.Field>
                  <label>Peran</label>
                  {registration.peran ? registration.peran : '-'}
                </Form.Field>
                <Form.Field>
                  <label>No.HP (dengan WhatsApp Aktif)</label>
                  {registration.no_hp ? registration.no_hp : '-'}
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  {registration.email ? registration.email : '-'}
                </Form.Field>
                <Form.Field>
                  <label>Keterangan</label>
                  {registration.keterangan ? registration.keterangan : '-'}
                </Form.Field>
              </Card.Content>
            </Card>
          </Form>
        </LayoutNoMenu>
      </div>
    )
  }
}

export default withRouter(IsianPmo)