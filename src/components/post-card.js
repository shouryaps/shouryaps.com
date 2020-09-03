import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostCard = ({ data }) => (
  <Link to={data.frontmatter.slug}>
  <article className="post-card">
    <div className="post-content">
      <h2 className="title">{data.frontmatter.title}</h2>
      <p className="meta"><time>{data.frontmatter.date}</time> &middot; <span>{data.fields.readingTime.text}</span></p>
      <p className="description">{data.frontmatter.description}</p>
    </div>
    <div className="featured-image-div">
    <Img 
        fluid={data.frontmatter.featuredImage.childImageSharp.fluid} 
        alt={data.frontmatter.title + ' - Featured image'}
      />
    </div>
  </article>
  </Link>
)

export default PostCard