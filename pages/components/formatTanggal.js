import React, { Component } from 'react'
import { Card, Icon, Grid, Button } from 'semantic-ui-react'
import moment from 'moment'

export default class FormatTanggal extends Component {

  bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  render(){

    const {tanggal} = this.props

    return (
      <div style={{display:'inline-flex'}}>
        {moment(tanggal).format('D') + " " + this.bulan[moment(tanggal).format('M')-1] + " " + moment(tanggal).format('YYYY')}
      </div>
    )
  }
}