import util from 'util'

import linkPackage from './linkPackage'

let fetchedList = []

const exec = util.promisify(require('child_process').exec)

const getPackages = async () => {
  try {
    const { stdout, stderr } = await exec('npm --json list 2> /dev/null', { maxBuffer: 1024 * 500 })

    if (stderr) {
      throw new Error(`ERROR: ${stderr}`)
    }

    return stdout
  } catch (error) {
    if (error.stderr) {
      throw new Error(`ERROR: ${stderr}`)
    }

    return error.stdout
  }
}

const fetchPackage = async () => {
  const pkgs = await getPackages()

  return fetchNestedDependenciesVersion(JSON.parse(pkgs))
}

const fetchNestedDependenciesVersion = (pkgs) => {
  const pkgList = Object.keys(pkgs.dependencies)

  pkgList.forEach(async name => {
    if (pkgs.dependencies[name].extraneous) return

    if (fetchedList.indexOf(name) === -1)
      fetchedList.push(name)
      await linkPackage(name, pkgs.dependencies[name].version)

    if (pkgs.dependencies[name].dependencies && Object.keys(pkgs.dependencies[name].dependencies).length !== 0)
      fetchNestedDependenciesVersion(pkgs.dependencies[name])
  })
}

export default fetchPackage
