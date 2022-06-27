import React, { Component } from 'react';
import "./About.css";
import me from "../assets/me.jpg";
  
export default class About extends Component {
  render() {
    return (
      <div>
      <div class="split left">
        <div className="centered">
          <img 
            className="profile_image"
            src={me}
            alt="Profile Pic"
            ></img>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <div className="name_title">Anuoluwa Shittu </div>
          <div className="brief_description">
          Currently an Undergraduate at East Carolina University, love playing sports, played football,soccer and ran track. 
          </div>
        </div>
      </div>
    </div>
    )
  }
}