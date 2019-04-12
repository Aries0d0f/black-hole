import util from 'util'
import path from 'path'

import config from './config'

const exec = util.promisify(require('child_process').exec)

const linkPackage = async (pkgName, version) => {
  try {
    const pkgPath = path.resolve(process.cwd(), 'node_modules', pkgName)
    const targetDir = path.resolve(config.packageDir, version ? `${pkgName}^${version}` : pkgName)
    await exec(`mkdir -p ${targetDir} && cp -R ${pkgPath} ${targetDir} && rm -rf ${pkgPath} && ln -s ${targetDir}/${pkgName.split('/')[pkgName.split('/').length - 1]} ${pkgPath}`)
  } catch (error) {
    console.error(error)
  }
}

export default linkPackage
