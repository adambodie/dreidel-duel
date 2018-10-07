import React from "react"
import styles from "./header.module.css";
import { StaticQuery, graphql } from "gatsby"
export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `
}
	render={data => (
		<div className={styles.jumbotron}>
			<h1 className={styles.display4}>{data.site.siteMetadata.title}</h1>
			<h3 className={styles.display3}>by {data.site.siteMetadata.author}</h3>
		</div>
)}
/>
)

