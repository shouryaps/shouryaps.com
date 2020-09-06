import React from "react"
import { Link , graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const tagPageQuery = graphql`
  query tagListQuery {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
class TagList extends React.Component {
  render() {
    
    const { data } = this.props
    
    return (
      <Layout className="blog-page" isHero={true}>
      <SEO
        title={"Tags — Shourya's Blog"}
        description={"Tags in Shourya's Blog" }
      />
      <h1> Tags </h1>
      <div className="tag-cloud">
        <ul className="tags">
          {data.allMarkdownRemark.group.map(tag => (
            <Link to={`/tags/${tag.fieldValue}/`} key={tag.fieldValue}><li className="tag">{tag.fieldValue} ({tag.totalCount})</li></Link>
          ))}
        </ul>
      </div>
    </Layout>
    )
  }
}

export default TagList