const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	// режим разработки 'development', 'production', 'none'
	mode: 'development',
	// точка входа
	entry: {
		// Точка входа для javascript
		main: path.resolve(__dirname, './src/index.js'),
	},
	// точка выхода
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
	},
	// модули и загрузчики
	module: {
		rules: [
			// JavaScript
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			// Изображения
			{
				test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]'
				},
				// Исключить папку со шрифтами
				exclude: [
					path.resolve(__dirname, 'src/fonts'),
				]
			},
			// CSS, PostCSS, Sass
			{
				test: /\.(sa|sc|c)ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			// Шрифты
			{
				test: /\.(woff2?|eot|ttf|otf|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				},
				// Исключить папку с картинками
				exclude: [
					path.resolve(__dirname, 'src/img'),
				]
			},
		],
	},
	// плагины
	plugins: [
		// Плагин очистки директории dist при каждой сборке
		new CleanWebpackPlugin(),
		// Плагин создания HTML на основе шаблона
		new HtmlWebpackPlugin({
			title: 'Matrix',
			template: path.resolve(__dirname, './src/template.html'), // шаблон
			filename: 'index.html', // название выходного файла
			meta: {
				// <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
			},
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		watchFiles: ['src/template.html'],
		hot: true,
		port: 3000,
	},
}