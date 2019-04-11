import commander from 'commander'
import * as pkg from '../package.json'

commander
  .version(pkg.version, '-v, --version')
  .option('-d, --dir', 'show current managed package directory')
  .parse(process.argv)
