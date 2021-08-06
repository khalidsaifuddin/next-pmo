import React, { Component } from 'react'
import { Card, Icon, Grid, Button } from 'semantic-ui-react'

export default class CardPenulis extends Component {

  editProfil = () => {
    window.location.href="/profil/form_profil?pengguna_id="+this.props.penulis.pengguna_id
  }

  render(){

    const {penulis, withoudHeader, selfProfile, noFollowPanel} = this.props

    return (
      <Card fluid>
        {withoudHeader &&
        <Card.Content>
          <Card.Header>
            Penulis
          </Card.Header>
        </Card.Content>
        }
        <Card.Content>
          <Grid>
            <Grid.Column width={!noFollowPanel ? "10" : "16"} style={{display:'inline-flex'}}>
              <div style={{
                borderRadius:'50%', 
                height:'64px', 
                width:'64px', 
                border:'1px solid #ccc', 
                background:'url(https://react.semantic-ui.com/images/avatar/large/matthew.png)',
                backgroundSize: 'cover'
              }}></div>
              <div style={{marginLeft:'16px'}}>
                <h4 style={{marginBottom:'0px'}}>
                  {penulis && penulis.nama}
                </h4>
                <div>@{penulis && penulis.username}</div>
                <div style={{marginTop:'16px'}}>
                  <Icon name='star' /> 0 &nbsp;|&nbsp; <Icon name="book" /> 0 Cerita
                </div>
              </div>
            </Grid.Column>
            {!noFollowPanel &&
            <Grid.Column width="6" style={{textAlign:'center'}}>
              <Grid>
                <Grid.Column width={8} style={{textAlign:'center', border:'0px solid #ccc', padding:'8px'}}>
                  <Icon name="users" /> {selfProfile ? <a href={"/profil/following?pengguna_id="+(penulis && penulis.pengguna_id)}>0 Following</a> : '0 Following'}
                </Grid.Column>
                <Grid.Column width={8} style={{textAlign:'center', border:'0px solid #ccc', padding:'8px'}}>
                  <Icon name="users" /> {selfProfile ? <a href={"/profil/follower?pengguna_id="+(penulis && penulis.pengguna_id)}>0 Follower</a> : '0 Follower'}
                </Grid.Column>
                {!selfProfile &&
                <Grid.Column width="16" style={{textAlign:'center', border:'0px solid #ccc', padding:'8px'}}>
                  <Button fluid basic color={'blue'}>
                    <Icon name="user plus" />
                    Ikuti
                  </Button>
                </Grid.Column>
                }
                {selfProfile &&
                <Grid.Column width="16" style={{textAlign:'center', border:'0px solid #ccc', padding:'8px'}}>
                  <Button fluid basic color={'blue'} onClick={this.editProfil}>
                    <Icon name="edit" />
                    Edit Profil
                  </Button>
                </Grid.Column>
                }
              </Grid>
            </Grid.Column>
            }
          </Grid>
        </Card.Content>
      </Card>
    )
  }
}