import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { motion, useAnimation } from "framer-motion"

import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query HomeQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        icon {
          childImageSharp {
            fluid(maxWidth: 60, quality: 90) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        illustration {
          childImageSharp {
            fluid(maxWidth: 480, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark

  // Controls to orchestrate animations of waving hand
  const eControls = useAnimation()

  useEffect(() => {
    const pageLoadSequence = async () => {
      eControls.start({
        rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
        transition: { duration: 2.5, loop: 5, repeatDelay: 1 },
      })
    }
    pageLoadSequence()
  }, [eControls])

	return (
		<Layout isHero={true}>
      <SEO/>
      <div className="home-banner grids col-1 sm-2">
        <div>
          <div className="greetings">
            <motion.div animate={eControls}>
                  <Img className="emoji" fluid={frontmatter.icon.childImageSharp.fluid} />
            </motion.div>
            Hello there!
          </div>
          <div className="introduction">I'm&nbsp;{frontmatter.name}</div>
          <div className="subheading">This page is a work in progress</div>
          {/* <div className="subheading">You can read <Link to="/about">about me here</Link> or read my latest blog posts </div>below. */}
        </div>
        <div className="image-holder">
          <Img fluid={frontmatter.illustration.childImageSharp.fluid} />
        </div>
      </div>
      <BlogListHome/>
		</Layout>
	)
}

export default HomePage
