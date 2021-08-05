import React, { Component } from 'react'
import { Card, Icon, Image, Grid, Placeholder } from 'semantic-ui-react'

export default class CardBuku extends Component {

  default_cover = 'https://react.semantic-ui.com/images/wireframe/image.png'

  render(){
    return (
      <Card fluid style={{maxWidth:(this.props.fluid ? '100%' : '200px'), margin:(this.props.fluid ? '0px' : '8px'), minWidth:(this.props.fluid ? '100%' : '200px')}}>
        {this.props.placeholder &&
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        }
        {!this.props.placeholder &&
        <a href={"/cerita/preview/"+(this.props.record ? this.props.record.cerita_id : '')}>
          <div style={{
            height:'192px', 
            border:'0px solid #ccc', 
            backgroundImage:'url('+(this.props.record ? (this.props.record.gambar_cover ? this.props.record.gambar_cover : this.default_cover) : this.default_cover)+')',
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
          }}
          >
            &nbsp;
          </div>
        </a>
        }
        <Card.Content style={{padding:'8px', flexGrow:'inherit'}}>
          {this.props.placeholder &&
          <Placeholder>
            <Placeholder.Line length='very long' />
            <Placeholder.Line length='short' />
            <Placeholder.Line length='very short' />
          </Placeholder>
          }
          {!this.props.placeholder &&
          <>
          <a href={"/cerita/preview/"+(this.props.record ? this.props.record.cerita_id : '')} style={{fontWeight:'bold', color:'#434343'}}>
            <Card.Header style={{fontSize:'14px', minHeight:'36px', maxHeight:'36px', overflow:'hidden', textOverflow:'ellipsis'}}>{this.props.record ? this.props.record.judul :'-'}</Card.Header>
          </a>
          <Card.Meta style={{minHeight:'18px', maxHeight:'18px'}}>
            <a href={"/profil/"+(this.props.record ? this.props.record.pengguna_id : '')}><span className='date' style={{fontSize:'12px'}}>{this.props.record ? this.props.record.nama_pengguna : ''}</span></a>
          </Card.Meta>
          <Card.Meta style={{fontSize:'12px'}}>{this.props.record && this.props.record.bab_cerita ? this.props.record.bab_cerita.length > 0 ? this.props.record.bab_cerita.length : '0' :'0'} Bab</Card.Meta>
          </>
          }
        </Card.Content>
        <Card.Content extra style={{padding:'16px', flexGrow:'inherit'}}>
          {this.props.placeholder &&
            <Grid> 
              <Grid.Column width={8} style={{padding:'8px'}}>
                <Placeholder>
                  <Placeholder.Line length="very short" />
                </Placeholder>
              </Grid.Column>
              <Grid.Column width={8} style={{textAlign:'right', padding:'8px'}}>
                <Placeholder>
                  <Placeholder.Line length="very short" />
                </Placeholder>
              </Grid.Column>
            </Grid>
          }
          {!this.props.placeholder &&
          <Grid>
            <Grid.Column width={8} style={{padding:'8px'}}>
              <a>
                <Icon name='eye' />
                22k
              </a>
            </Grid.Column>
            <Grid.Column width={8} style={{textAlign:'right', padding:'8px'}}>
              <a>
                <Icon name='star' />
                5
              </a>
            </Grid.Column>
          </Grid>
          }
        </Card.Content>
      </Card>
    )
  }
}

// export default CardBuku