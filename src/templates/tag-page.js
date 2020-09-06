import React from "react"
import { Link , graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine, RiArrowRightSLine } from "react-icons/ri"

import Layout from "../components/layout"
import PostCard from "../components/post-card"
import SEO from "../components/seo"

export const tagPageQuery = graphql`
  query tagPageQuery($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] }, template: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
		) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            description
            tags
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
							}
            }
          }
          fields {
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`
const Pagination = (props) => (
  <div className="pagination">
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
          <span className="icon -left"><RiArrowLeftLine/></span> Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`} >
          <Link
            to={`${props.tagSlug}${i === 0 ? '' : i + 1}`}
            className={props.currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Next <span className="icon -right"><RiArrowRightLine/></span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)
class TagPage extends React.Component {
  render() {
    
    const { data } = this.props
    const { tag, currentPage, numPages } = this.props.pageContext
    const tagSlug = '/tags/' + tag + '/'
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? tagSlug : tagSlug + (currentPage - 1).toString()
    const nextPage = tagSlug + (currentPage + 1).toString()

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge =>
        <PostCard key={edge.node.id} data={edge.node} />
      )
    let props = {
      isFirst,
      prevPage,
      numPages,
      tagSlug,
      currentPage,
      isLast,
      nextPage
    }
    
    return (
      <Layout className="blog-page" isHero={true}>
        <SEO
          title={`Tagged "${tag}" — Shourya's Blog - Page ${currentPage} of ${numPages}`}
          description={`tagged "${tag}" blog pages ${currentPage} of ${numPages}`}
        />
        <div className="tag-page-header">
          <h1>
            Tagged "{tag}"
          </h1>
          <Link className="button" to="/tags">See all tags<span className="icon -right"><RiArrowRightSLine/></span></Link>
        </div>
        <div className="grids col-1 sm-1 lg-2">
          {posts}
        </div>
        <Pagination {...props} />
      </Layout>
    )
  }
}

export default TagPage