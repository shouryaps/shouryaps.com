import React from "react"
import { Link } from "gatsby"
import {RiArrowLeftSLine} from "react-icons/ri"
import {GiSpaceSuit} from "react-icons/gi"

import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFound = () => (
  <Layout className="not-found-page">
    <SEO title="Page not found"/>
    <div className="wrapper" style={{
      textAlign: "center"
    }}>
      <header>
        <GiSpaceSuit style={{
          fontSize: "128px",
          color: "var(--primary-color)"
        }}/>
        <h1>Oops, I did not expect that to happen</h1>
        <p>Have you wondered into the unknown?</p>
      </header>
      <Link to="/" className="button"><RiArrowLeftSLine className="icon -left"/>Back to Homepage</Link>
    </div>
  </Layout>
)

export default NotFound