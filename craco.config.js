// craco.config.js
const webpack = require('webpack')

module.exports = {
	webpack: {
		configure: webpackConfig => {
			// 1) add a fallback for `buffer`
			webpackConfig.resolve.fallback = {
				...(webpackConfig.resolve.fallback || {}),
				buffer: require.resolve('buffer/'),
			}
			// 2) inject Buffer globally
			webpackConfig.plugins.push(
				new webpack.ProvidePlugin({
					Buffer: ['buffer', 'Buffer'],
				})
			)
			return webpackConfig
		},
	},
}
