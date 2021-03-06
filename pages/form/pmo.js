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

const setOptionWilayah = (elements) => {
  let tmpArr = []
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index]
    
    let arr = {}
    arr.key = element.kode 
    arr.value = element.kode 
    arr.text = element.nama

    tmpArr.push(arr)
  }

  return tmpArr
}

export const getServerSideProps = async () => {

  const { data: jenis_pendaftaran } = await RegistrationActions.getJenisPendaftaran({}, config.api_base)
  const { data: provinsi } = await AppActions.getProvinsi({}, config.api_base)

  console.log(jenis_pendaftaran)

  let JenisPendaftaranOptions = []

  for (let index = 0; index < jenis_pendaftaran.length; index++) {
    const element = jenis_pendaftaran[index]
    
    let arr = {}
    arr.key = element.ID 
    arr.value = element.ID 
    arr.text = element.Nama

    JenisPendaftaranOptions.push(arr)
  }
  
  console.log(provinsi)

  return {
    props: {
      jenis_pendaftaran,
      JenisPendaftaranOptions,
      provinsi: setOptionWilayah(provinsi)
    }
  }
}

class Pmo extends Component {
  
  state = {
    loading: true,
    judul: 'Form Pengelola Program Management Office',
    params: {},
    sudah_submit: false,
    arrLoading: [1,2,3,4],
    JenisPendaftaranOptions:[],
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

    if(this.state.params.kode_provinsi){
      //load records of kabupaten
      AppActions.getKabupaten({induk_kode: this.state.params.kode_provinsi}, config.api_base).then((result)=>{
          
        this.setState({
          kabupaten: this.setOptionWilayah(result.data)
        },()=>{
          // console.log(this.state.kabupaten)
        })

      })
    }
  }

  componentDidMount = () => {

    this.setState({
      rootUrl: window.location.origin
    })

    this.loadInitialData()
  }

  setValueSelect = (tipe) => (e, d) => {
    this.setState({
      params: {
        ...this.state.params,
        [tipe]: d.value
      }
    },()=>{
      if(tipe === 'kode_provinsi'){
        AppActions.getKabupaten({induk_kode: d.value}, config.api_base).then((result)=>{
          
          this.setState({
            kabupaten: setOptionWilayah(result.data)
          },()=>{
            // console.log(this.state.kabupaten)
          })

        })
      }

      // console.log(this.state.params)
    })
  }

  setValueField = (tipe) => (e) => {
    this.setState({
      params: {
        ...this.state.params,
        [tipe]: e.currentTarget.value
      }
    },()=>{
      // console.log(this.state.params)
    })
  }

  TombolSimpan = () => {
    return (
      <Button size={'large'} type="submit" color={'green'} onClick={this.simpan} loading={this.props.loading}>
        <Icon name="save" />
        {this.props.loading ? 'Menyimpan...' : 'Simpan'}
      </Button>
    )
  }

  setModalOpen = (result) => {
    this.setState({
      loading: false,
      modal_open: true,
      params: {
        ...result.data
      }
    })
  }

  simpan = () => {
    this.setState({
      loading: true
    },()=>{

      RegistrationActions.simpanPendaftaran(this.state.params, config.api_base).then((result)=>{
        if(result.status === 201){
          this.setModalOpen(result)
        }else{
          //gagal
          this.setState({
            loading: false
          })
        }
      }).catch(()=>{
        this.setState({
          loading: false
        })
      })

    })
  }

  keHasilIsian = (params) => {
    // console.log(params)
    window.location.href = "/form/isian_pmo?id="+params.id
  }

  render() {
    const { kabupaten } = this.state
    
    return (
      <div className="container">
        <Modal
          open={this.state.modal_open}
        >
          <Modal.Header>Pendaftaran Berhasil</Modal.Header>
          <Modal.Content>
            Data Anda telah tersimpan ke dalam sistem. Silakan akses link di bawah ini untuk melihat hasil isian Anda, atau klik tombol di bawah ini
            <Card fluid style={{marginTop:'8px', marginBottom:'8px'}}>
              <Card.Content>
                <a href={this.state.rootUrl+"/form/isian_pmo?id="+this.state.params.id}>
                  {this.state.rootUrl+"/form/isian_pmo?id="+this.state.params.id}
                </a>
              </Card.Content>
            </Card>
            Anda bisa menyimpan link ini sewaktu-waktu Anda ingin mengecek data Anda
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => this.setState({modal_open:false})}>
              Tutup dan Kembali ke Form
            </Button>
            <Button
              content="Lihat Hasil Isian"
              labelPosition='right'
              icon='checkmark'
              onClick={()=>this.keHasilIsian(this.state.params)}
              positive
            />
          </Modal.Actions>
        </Modal>
        <Head>
          <title>Form PMO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavbarSimple />
        <LayoutNoMenu>
          <h3>{this.state.judul}</h3>
          <br/>
          <Form onSubmit={this.submitForm}>
            <Card fluid>
              <Card.Content>
                <Form.Field error={this.state.sudah_submit && !this.state.params.jenis_pendaftaran_id}>
                  <label>Jenis Pengelola</label>
                  <Dropdown value={this.state.params.jenis_pendaftaran_id} fluid selection placeholder='Pilih Jenis Pengelola...' options={this.props.JenisPendaftaranOptions} onChange={this.setValueSelect('jenis_pendaftaran_id')} />
                </Form.Field>
                <Form.Field error={this.state.sudah_submit && !this.state.params.kode_provinsi}>
                  <label>Provinsi</label>
                  <Dropdown value={this.state.params.kode_provinsi} fluid selection placeholder='Pilih Provinsi...' options={this.props.provinsi} onChange={this.setValueSelect('kode_provinsi')} />
                </Form.Field>
                {this.state.params.jenis_pendaftaran_id === 2 &&
                <Form.Field error={this.state.sudah_submit && !this.state.params.kode_provinsi}>
                  <label>Kabupaten/Kota</label>
                  <Dropdown value={this.state.params.kode_kabupaten} fluid selection placeholder='Pilih Kabupaten/Kota...' options={kabupaten} onChange={this.setValueSelect('kode_kabupaten')} />
                </Form.Field>
                }
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Content>
                <Form.Field error={this.state.sudah_submit && !this.state.params.nama}>
                  <label>Nama</label>
                  <input disabled={this.props.loading} value={this.state.params.nama} placeholder='Nama' onChange={this.setValueField('nama')} />
                </Form.Field>
                <Form.Field error={this.state.sudah_submit && !this.state.params.lembaga_asal}>
                  <label>Lembaga Asal</label>
                  <input disabled={this.props.loading} value={this.state.params.lembaga_asal} placeholder='Lembaga Asal' onChange={this.setValueField('lembaga_asal')} />
                </Form.Field>
                <Form.Field error={this.state.sudah_submit && !this.state.params.peran}>
                  <label>Peran</label>
                  <input disabled={this.props.loading} value={this.state.params.peran} placeholder='Peran' onChange={this.setValueField('peran')} />
                </Form.Field>
                <Form.Field error={this.state.sudah_submit && !this.state.params.no_hp}>
                  <label>No.HP (dengan WhatsApp Aktif)</label>
                  <input type="number" disabled={this.props.loading} value={this.state.params.no_hp} placeholder='No.HP' onChange={this.setValueField('no_hp')} />
                </Form.Field>
                <Form.Field error={this.state.sudah_submit && !this.state.params.email}>
                  <label>Email</label>
                  <input disabled={this.props.loading} value={this.state.params.email} placeholder='Email' onChange={this.setValueField('email')} />
                </Form.Field>
                <Form.Field>
                  <label>Keterangan</label>
                  <input disabled={this.props.loading} value={this.state.params.keterangan} placeholder='Keterangan' onChange={this.setValueField('keterangan')} />
                </Form.Field>
              </Card.Content>
            </Card>
            {this.TombolSimpan()}
          </Form>
        </LayoutNoMenu>
      </div>
    )
  }
}

export default withRouter(Pmo)