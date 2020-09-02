import React from "react"
import { RiMailLine, RiLinkedinBoxFill, RiTwitterFill, RiGithubFill, RiInstagramFill, RiFacebookCircleFill } from "react-icons/ri"

class Social extends React.Component {

  render () {
    return (
      <div className="social-header">
        <a aria-label="mail" href={"mailto:"+this.props.email}><RiMailLine /></a>
        <a aria-label="linkedin" href={"https://linkedin.com/in/"+this.props.username}><RiLinkedinBoxFill /></a>
        <a aria-label="twitter" href={"https://twitter.com/"+this.props.username}><RiTwitterFill /></a>
        <a aria-label="github" href={"https://github.com/"+this.props.username}><RiGithubFill /></a>
        <a aria-label="instagram" href={"https://instagram.com/"+this.props.username}><RiInstagramFill /></a>
        <a aria-label="facebook" href={"https://facebook.com/"+this.props.username}><RiFacebookCircleFill /></a>
      </div>
    )
  }
}

export default Social
