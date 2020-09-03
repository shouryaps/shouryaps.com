import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
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
              ...GatsbyImageSharpFluid
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
          <div className="greetings"><div>Hi</div>
            <motion.div animate={eControls}>
                  <Img className="emoji" fluid={frontmatter.icon.childImageSharp.fluid} />
            </motion.div>
            <div className="introduction">I'm&nbsp;<strong>{frontmatter.name}</strong></div>
          </div>
          {/* <p className="subheading">Welcome to my home on the internet</p> */}
          <p className="subheading">this is a work in progress</p>
          <p className="description">You can read <Link to="/about">about me here</Link> or read my latest blog posts below.</p>
        </div>
      </div>
      <BlogListHome/>
		</Layout>
	)
}

export default HomePage
