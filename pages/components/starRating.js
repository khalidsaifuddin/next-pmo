import React, { Component } from 'react'
import { Card, Icon, Grid, Button } from 'semantic-ui-react'

export default class StarRating extends Component {

  star = [
    (<Icon name="star" color="yellow" />),
    (<Icon name="star" color="yellow" />),
    (<Icon name="star" color="yellow" />),
    (<Icon name="star" color="yellow" />),
    (<Icon name="star" color="yellow" />)
  ]

  render(){

    const {nilai} = this.props

    return (
      <div style={{display:'inline-flex'}}>
        <div style={{marginRight:'8px'}}>
          {nilai}
        </div>
        <div>
          <div>
            <Icon name="star" color="grey" />
            <Icon name="star" color="grey" />
            <Icon name="star" color="grey" />
            <Icon name="star" color="grey" />
            <Icon name="star" color="grey" />
          </div>
          {/* <div style={{marginTop:'0px'}}> */}
          <div style={{marginTop:'-24px'}}>
            {this.star.map((obj)=>{
              if(this.star.indexOf(obj)+1 < nilai){
                // return this.star.indexOf(obj)
                return obj
              }
            })}
            {parseFloat(Math.ceil(nilai)-nilai).toFixed(1) > 0.5 ? '' : <Icon name="star half" color="yellow" />}
          </div>
        </div>
      </div>
    )
  }
}