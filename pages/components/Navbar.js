import React, {Component} from 'react'
import main from '../_app'
import { Container, Grid, Search, Button, Icon } from 'semantic-ui-react'
import '../../styles/global.module.css'
import 'semantic-ui-css/semantic.min.css'
import localforage from 'localforage'
import cekLogin from '../../functions/app_functions'

// const initialState = {
//   loading: false
// }

// const devBorder = {
//   borderBottom:'1px solid #eee',
//   boxShadow: '0px 5px 5px #eee',
// }

// const styles = {
//   borderBottom:'1px solid #eee',
//   boxShadow: '0px 5px 5px #eee',
//   paddingTop:'8px'
// }

// function navbarReducer(state, action) {
//   switch (action.type) {
//     default:
//       throw new Error()
//   }
// }

class Navbar extends Component {
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
              
  //           })
  //         })
  //       })
  //     }else{
  //       //belum login
  //     }
  //   })
  // }

  handleKeyPress = (event) => {
    
    if(event.key === 'Enter'){
      window.location.href="/cari/"+event.target.value
    }
    
  }

  componentDidMount = () => {
    // this.cekLogin()
    
    cekLogin().then((value)=>{
      this.setState({
        ...this.state,
        ...value
      })
    })
  }
  
  render(){

    return (
      <Container style={{width:'100% !important', position:'fixed', background:'white', zIndex:'99999'}}>
        <Grid style={{...this.devBorder, ...this.styles}}>
          <Grid.Column computer={2} only='computer'>
          </Grid.Column>
          <Grid.Column computer={12} mobile={16} tablet={16}>
            
            <Grid style={{marginBottom:'-20px', marginTop:'0px'}}>
              <Grid.Column computer={4} mobile={16} tablet={16}>
                <a href="/">
                  <img src="/kitacerita-logo.png" style={{height:'28px', marginTop:'6px'}} />
                </a>
              </Grid.Column>
              <Grid.Column computer={8} only='computer' style={{textAlign:'center'}}>
                {this.props.searchbar &&
                <Search
                  // fluid
                  loading={this.state.loading}
                  className="navbar-search"
                  open={false}
                  onKeyPress={this.handleKeyPress}
                />
                }
              </Grid.Column>
              <Grid.Column computer={4} only='computer' style={{textAlign:'-webkit-right'}}>
                {/* <div style={{height:'36px', width:'36px', borderRadius:'50%', background:'#434343'}}>
                  &nbsp;
                </div> */}
                {this.state.sudah_login !== 1 &&
                <>
                {this.props.loginButton  &&
                <Button circular className="bawahCiri" icon labelPosition='right' color='violet' onClick={()=>window.location.href="/login"}>
                  Login/Daftar
                  <Icon name='right arrow' />
                </Button>
                }
                </>
                }
                {this.state.sudah_login === 1 &&
                <>
                  <Button onClick={()=>window.location.href="/profil/"+this.state.pengguna.pengguna_id} style={{display:'inline-flex', padding:'0px', background:'white'}}>
                    <div style={{textAlign:'right', marginRight:'8px', marginTop:'0px', fontWeight:'normal',  height:'40px', lineHeight:'40px'}}>
                      {this.state.pengguna.nama}
                    </div>
                    <div style={{
                      borderRadius:'50%', 
                      height:'40px', 
                      width:'40px', 
                      border:'1px solid #ccc', 
                      background:'url(https://react.semantic-ui.com/images/avatar/large/matthew.png)',
                      backgroundSize: 'cover'
                    }}></div>
                  </Button>
                </>
                }
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

Navbar.defaultProps = {
  searchbar: true,
  loginButton: true
}

export default Navbar

// export default function Navbar({props, main, searchbar = true, loginButton = true}) {
//   const [state, dispatch] = React.useReducer(navbarReducer, initialState)
//   const { loading } = state

//   const handleKeyPress = (event) => {
    
//     if(event.key === 'Enter'){
//       // console.log(event)
//       window.location.href="/cari/"+event.target.value
//     }
    
//   }

// }