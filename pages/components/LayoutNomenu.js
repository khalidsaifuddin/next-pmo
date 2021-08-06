import React, { Component } from 'react'
import { Grid, Menu, Icon, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
// import { useRouter } from 'next/router'

export default class LayoutNoMenu extends Component {
  state = {
    activeItem: 'home'
  }

  componentDidMount = () => {
    // console.log(window.location.href.split('/'))

    let urls = window.location.href.split('/')

  }

  render() {
    const {activeItem} = this.state

    return (
      <div className="container">
        <Grid>
          <Grid.Column computer={2} only='computer'>
          </Grid.Column>
          <Grid.Column computer={12} mobile={16} tablet={16}>
            
            <Grid style={{marginTop:'64px'}}>
              <Grid.Column computer={16} mobile={16} tablet={16}>
                {this.props.children}
              </Grid.Column>
            </Grid>

          </Grid.Column>
          <Grid.Column computer={2} only='computer'>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}