import React, {Component} from 'react'
import { Container, Grid } from 'semantic-ui-react'
import '../../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'

class NavbarSimple extends Component {
  state = {
    loading: false,
    sudah_login: 0,
    pengguna: {}
  }

  devBorder = {
    borderBottom:'1px solid #eee',
    boxShadow: '0px 5px 5px #eee',
  }

  styles = {
    borderBottom:'1px solid #eee',
    boxShadow: '0px 5px 5px #eee',
    paddingTop:'8px'
  }

  handleKeyPress = (event) => {
    
    if(event.key === 'Enter'){
      window.location.href="/cari/"+event.target.value
    }
    
  }

  componentDidMount = () => {
    
  }
  
  render(){

    return (
      <Container style={{width:'100% !important', position:'fixed', background:'white', zIndex:'99999'}}>
        <Grid style={{...this.devBorder, ...this.styles}}>
          <Grid.Column computer={2} only='computer'>
          </Grid.Column>
          <Grid.Column computer={12} mobile={16} tablet={16}>
            
            <Grid style={{marginBottom:'-20px', marginTop:'0px'}}>
              <Grid.Column computer={16} mobile={16} tablet={16}>
                <a href="/">
                  <img src="/pmo-logo.png" style={{height:'28px', marginTop:'6px'}} />
                </a>
              </Grid.Column>
            </Grid>
    
          </Grid.Column>
          <Grid.Column computer={2} only='computer'>
          </Grid.Column>
        </Grid>
        <div style={{marginTop:'24px'}}></div>
        <style jsx global>{`
          .navbar-search > .input{
            width:100%;
          }
          .googleLogin{
            width:100%;
            display: inline-flex !important;
            justify-content: center !important;
            border-radius: 20px !important;
          }
          .googleLogin > div{
            border-radius: 20px !important;
          }
          .bawahCiri{
            box-shadow: 0px 5px 0px #8d66e2 !important;
          }
          .bawahCiriPutih{
            border:1px solid #ccc;
            box-shadow: 0px 7px 0px #eeeeee !important;
          }
          .etalaseBuku{
            border: 0px solid #ccc;
            width:100%;
            padding:8px;
            padding-left:0px;
            padding-right:0px;
            display: inline-flex;
            justify-content: flex-start;
            overflow: auto;
          }
          .etalaseKategori{
            border:1px solid #ccc;
          }
          .menuUtama > a {
            padding-left: 0px !important;
          }
        `}</style>
      </Container>
    )

  }
}

NavbarSimple.defaultProps = {
  searchbar: true,
  loginButton: true
}

export default NavbarSimple