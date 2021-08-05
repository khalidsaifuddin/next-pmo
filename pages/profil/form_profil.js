import React, { Component } from 'react'
import Head from 'next/head'
import { Icon, Button, Form, Select, Dropdown } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { withRouter } from 'next/router'
import config from '../../config'
import * as AppActions from '../../store/actions/app.actions'
import cekLogin from '../../functions/app_functions'
import getParameterByName from '../../functions/param_function'
import CardPenulis from '../components/cardPenulis'
import CardMessage from '../components/cardMessage'
import CardMessageError from '../components/cardMessageError'
import moment from 'moment'
import 'moment/locale/id'

class FormProfil extends Component {
  state = {
    loading: true,
    params: {
      tanggal_lahir: ''
    },
    tampilPesan: false,
    tampilPesanError: false,
    judulPesan: '',
    pesanPesan: '',
    positive: false,
    negative: false,
    sudah_submit: false,
    pengguna: {},
    identitas_pengguna: {},
    GenderOptions: [
      {key: 'L', value: 'L', text: 'Laki-laki'},
      {key: 'P', value: 'P', text: 'Perempuan'}
    ]
  }

  componentDidMount = () => {
    cekLogin().then((value)=>{
      this.setState({
        ...this.state,
        ...value
      })
    })

    this.props.router.events.on('routeChangeComplete',()=>{
      this.setState({
        loading: false, 
        params:{
          ...this.state.params,
          pengguna_id: (getParameterByName('pengguna_id', this.props.router.asPath) ? getParameterByName('pengguna_id', this.props.router.asPath) : null)
        }
      },()=>{
        // console.log(this.state.params)
        AppActions.getPengguna(this.state.params, config.api_base).then((result)=>{
          // console.log(result.data.rows)
          if(result.data.result > 0){
            this.setState({
              loading: false,
              pengguna: result.data.rows[0]
            },()=>{
              AppActions.getIdentitasPengguna(this.state.params, config.api_base).then((result)=>{
                if(result.data.result > 0){
                  this.setState({
                    loading: false,
                    identitas_pengguna: result.data.rows[0]
                  },()=>{
                    this.setState({
                      params: {
                        ...this.state.params,
                        ...this.state.identitas_pengguna
                      }
                    })
                  })
                }else{
                  this.setState({
                    loading: false,
                    identitas_pengguna: {
                      nama_depan: (this.state.pengguna.nama ? this.state.pengguna.nama.split(" ")[0] : ''),
                      nama_belakang: (this.state.pengguna.nama ? this.state.pengguna.nama.split(" ")[1] : '')
                    }
                  },()=>{
                    this.setState({
                      params: {
                        ...this.state.params,
                        ...this.state.identitas_pengguna
                      }
                    })
                  })
                }
              })
            })
          }
        })
      })
    })
  }
  
  simpan = () => {
    // alert(JSON.stringify(this.state.params))
    this.setState({
      loading: true
    },()=>{
      AppActions.simpanIdentitasPengguna(this.state.params, config.api_base).then((result)=>{
        // console.log(result)
        if(result.data.success){
          //berhasil
          this.setState({
            loading: false,
            tampilPesan: true,
            tampilPesanError: false,
            pesanPesan: 'Berhasil menyimpan data!'
          })
        }else{
          //gagal
          this.setState({
            loading: false,
            tampilPesanError: true,
            tampilPesan: false,
            pesanPesan: 'Gagal menyimpan data!'
          })
        }
      }).catch(()=>{
        //gagal exception
        this.setState({
          loading: false,
          tampilPesanError: true,
          tampilPesan: false,
          pesanPesan: 'Ada kesalahan teknis!'
        })
      })
    })
  }

  TombolSimpan = () => {
    return (
      <Button type="submit" color={'green'} onClick={this.simpan} loading={this.state.loading}>
        <Icon name="save" />
        {this.state.loading ? 'Menyimpan...' : 'Simpan'}
      </Button>
    )
  }

  setValueField = (tipe) => (e) => {
    this.setState({
      params: {
        ...this.state.params,
        [tipe]: e.currentTarget.value
      }
    },()=>{
      console.log(this.state.params)
    })
  }

  setValue = (tipe) => (event, {name, value}) => {
    console.log(tipe)
    console.log(event)
    console.log(name)
    console.log(value)

    this.setState({
      params: {
        ...this.state.params,
        [tipe]: value
      }
    },()=>{
      console.log(this.state.params)
    })
  }

  setValueSelect = (tipe) => (e, d) => {
    console.log(tipe)
    // console.log(e.target.value)
    // console.log(d.value)

    this.setState({
      params: {
        ...this.state.params,
        [tipe]: d.value
      }
    },()=>{
      console.log(this.state.params)
    })
  }

  submitForm = () => {
    // alert('tes')
    this.setState({
      sudah_submit: true
    },()=>{
      if(!this.state.params.nama_depan || !this.state.params.nama_belakang || !this.state.params.jenis_kelamin || !this.state.params.tempat_lahir || !this.state.params.tanggal_lahir){
        this.setState({
          tampilPesan: true,
          judulPesan: 'Form tidak lengkap!',
          pesanPesan: 'Mohon lengkapi semua isian form sebelum menyimpan!',
          negative: true
        },()=>{
          console.log(this.state)
        })
        return true
      }
    })
    
  }

  render() {
    const { router } = this.props
    const { pengguna, loading, GenderOptions } = this.state

    return (
      <div className="container">
        <Head>
          <title>KitaCerita - Form Profil {router.query.pengguna_id}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Layout>
          <CardPenulis penulis={pengguna} noFollowPanel />
          <h3>Edit Profil</h3>
          <Form onSubmit={this.submitForm}>
            <Form.Field error={this.state.sudah_submit && !this.state.params.nama_depan}>
              <label>Nama Depan</label>
              <input disabled={this.state.loading} value={this.state.params.nama_depan} placeholder='Nama Depan' onChange={this.setValueField('nama_depan')} />
            </Form.Field>
            <Form.Field error={this.state.sudah_submit && !this.state.params.nama_belakang}>
              <label>Nama Belakang</label>
              <input disabled={this.state.loading} value={this.state.params.nama_belakang} placeholder='Nama Belakang' onChange={this.setValueField('nama_belakang')}/>
            </Form.Field>
            <Form.Field error={this.state.sudah_submit && !this.state.params.jenis_kelamin}>
              <label>Gender</label>
              <Dropdown value={this.state.params.jenis_kelamin} fluid selection placeholder='Pilih Gender...' options={GenderOptions} onChange={this.setValueSelect('jenis_kelamin')} />
            </Form.Field>
            <Form.Field error={this.state.sudah_submit && !this.state.params.tempat_lahir}>
              <label>Tempat Lahir</label>
              <input disabled={this.state.loading} value={this.state.params.tempat_lahir} placeholder='Tempat Lahir' onChange={this.setValueField('tempat_lahir')}/>
            </Form.Field>
            <Form.Field error={this.state.sudah_submit && !this.state.params.tanggal_lahir}>
              <label>Tanggal Lahir</label>
              <DateInput
                clearable
                clearIcon={<Icon name="remove" color="red" />}
                name="date"
                value={this.state.params.tanggal_lahir}
                onChange={this.setValue('tanggal_lahir')}
                localization='id'
                startMode={"year"}
                placeholder={'Tanggal Lahir...'}
              />
            </Form.Field>
            {this.state.tampilPesan &&
            <CardMessage judul={this.state.judulPesan} pesan={this.state.pesanPesan} />
            }
            {this.state.tampilPesanError &&
            <CardMessageError judul={this.state.judulPesan} pesan={this.state.pesanPesan} />
            }
            <br/>
            {this.TombolSimpan()}
          </Form>
        </Layout>
      </div>
    )
  }
}

export default withRouter(FormProfil)