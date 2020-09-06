import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostCard = ({ data }) => (
  <article className="post-card">
    <div className="post-content">
    <Link to={data.frontmatter.slug}>
      <h2 className="title">{data.frontmatter.title}</h2>
    </Link>
      <p className="meta"><time>{data.frontmatter.date}</time> &middot; <span>{data.fields.readingTime.text}</span></p>
      <ul className="tags">
        {data.frontmatter.tags.map((value, index) => {
          return <Link to={`/tags/${value}/`}><li className="tag" key={index}>{value}</li></Link>
        })}
      </ul>
      <p className="description">{data.frontmatter.description}</p>
    </div>
    <Link to={data.frontmatter.slug}>
    <div className="featured-image-div">
    <Img 
        fluid={data.frontmatter.featuredImage.childImageSharp.fluid} 
        alt={data.frontmatter.title + ' - Featured image'}
      />
    </div>
    </Link>
  </article>
)

export default PostCard