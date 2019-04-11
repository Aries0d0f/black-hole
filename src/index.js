import commander from 'commander'
import mkdirp from 'mkdirp'

import config from './tools/config'
import fetchPackage from './tools/fetchPackage'
import * as pkg from '../package.json'

mkdirp(config.packageDir)

commander
  .version(pkg.version, '-v, --version')
  .option('-d, --dir', 'show current managed package directory')

commander
  .command('suck')
  .action(async pkg => {
    const result = await fetchPackage()
    console.log(result)
  })


commander.parse(process.argv)
