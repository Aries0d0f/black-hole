import os from 'os'

const DEFAULT_CONFIG = {
  config: '~/.blackholerc'.replace('~', os.homedir()),
  packageDir: '~/.blackhole/node_modules'.replace('~', os.homedir())
}

export default DEFAULT_CONFIG
