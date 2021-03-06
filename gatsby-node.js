const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)
  const tagPage = path.resolve(`./src/templates/tag-page.js`)
  const tagList = path.resolve(`./src/templates/tag-list.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
              tags
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // holds tags with post counts
  tagCounts = {}

  // Create markdown pages
  const posts = result.data.allMarkdownRemark.edges
  let blogPostsCount = 0

  posts.forEach((post, index) => {
    const id = post.node.id
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })

    // Count blog posts.
    if (post.node.frontmatter.template === 'blog-post') {
      post.node.frontmatter.tags.forEach(tag => {
        if (tag in tagCounts) {
          tagCounts[tag]++
        } else {
          tagCounts[tag] = 1
        }
      })
      blogPostsCount++
    }
  })

  const postsPerPage = 6

  // Create blog-list pages
  const numPages = Math.ceil(blogPostsCount / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create tag pages
  createPage({
    path: '/tags',
    component: tagList
  })
  for(var tag in tagCounts) {
    var numTagPages = Math.ceil(tagCounts[tag] / postsPerPage)
    Array.from({ length: numTagPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tags/${tag}/` : `/tags/${tag}/${i + 1}`,
        component: tagPage,
        context: {
          tag: tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numTagPages,
          currentPage: i + 1,
        },
      })
    })
  }

}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}