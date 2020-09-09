const HJson = require('hjson')
const fs = require('fs')
const path = require('path')

const config = HJson.parse(fs.readFileSync('./tsconfig.json', 'utf8'))

const paths = config.compilerOptions.paths

const alias = Object.keys(paths).reduce((prev, curr) => {
  const key = curr.replace(/\/\*$/, '')
  prev[key] = paths[curr][0].replace(/^src\//, './dist/').replace(/\/\*$/, '')
  return prev
}, {})

module.exports = function (api) {
  api.cache(true)

  const presets = []
  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve('./dist')],
        alias,
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
