module.exports = {
	siteMetadata: {
		title: `Dreidel Duel!`,
	},
    plugins: [
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography.js`,
        },
      },
    ],
  }
