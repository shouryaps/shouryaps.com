import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation";
import Social from "./social";

import "../assets/scss/style.scss"
import Footer from "./footer";

const query = graphql`
query LayoutQuery {
  site {
    siteMetadata {
      siteTitle: logoHeader
      socialHandle
      email
    }
  }
}
`

const Layout = ({children, className}) => {

  const { site } = useStaticQuery(query)
  const { siteTitle, socialHandle, email } = site.siteMetadata

  return (
    <div className="primary-container">
      <Header>
        <Logo title={siteTitle} />
        <Navigation/>
        <Social username={socialHandle} email={email} />
      </Header>
      <main className={"container " + className}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout

