import React from "react"
import styles from "../css/header.module.scss";
import Instructions from "./Instructions";
import { StaticQuery, graphql } from "gatsby";

export const PureHeader = ({ data }) => (
		<div className={styles.jumbotron}>
			<h1 className={styles.display4}>{data.site.siteMetadata.title}</h1>
			<h3 className={styles.display3}>by {data.site.siteMetadata.author}</h3>
			<Instructions />
		</div>
)


export const Header = props => (
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
	render={data => <Header {...props} data={data} />}
/>
)

export default Header
