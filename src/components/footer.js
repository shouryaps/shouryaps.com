import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Social from "./social";

const query = graphql`
query FooterQuery {
  site {
    siteMetadata {
      socialHandle
      email
    }
  }
}
`

const Footer = () => {
  const { site } = useStaticQuery(query)
  const { socialHandle, email } = site.siteMetadata
  return(
    <footer className="site-footer">
      <div className="container">
        <Social className="margin-right-15" username={socialHandle} email={email} />
        <p>Copyright Shourya Pratap Singh &#169; 2020 </p>
      </div>
    </footer>
  )
}

export default Footer