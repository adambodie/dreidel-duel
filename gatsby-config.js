module.exports = {
	siteMetadata: {
		title: `Dreidel Duel!`,
		author: `Adam Bodie`
	},
    plugins: [
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography.js`,
        },
      },
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          precision: 8,
        },
      },      
    ],
  }
