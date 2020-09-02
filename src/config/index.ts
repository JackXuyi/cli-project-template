import { isDev } from '../utils/env'
import devConfig from './dev.config'
import prodConfig from './prod.config'

const config = isDev ? devConfig : { ...devConfig, ...prodConfig }

export default Object.freeze(config)
