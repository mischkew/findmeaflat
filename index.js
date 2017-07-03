require('rootpath')()

const fs = require('fs')
const path = './lib/sources'
const notify = require('lib/services/notify')
const config = require ('conf/config.json')
const sources = fs.readdirSync(path)

const enabledPlatforms = [
  'immoscout',
  'immowelt',
  'immonet',
  'wggesucht',
  'kleinanzeigen'
].filter((platform) => config[platform].disabled !== true)

setInterval((function exec () {
  console.log(`Crawling from ${enabledPlatforms}`)

  Promise.all(sources.map(source => require(`${path}/${source}`).run()))
    .then((results) => {
      console.log(results)
	    const count = Array.prototype
        .concat(...results.filter(v => v !== false))
        .length

	    if (count > 0) {
	       notify.send(`Finished crawling ${count} new listings.`)
	       notify.send('\n*Crawling most recent listings from' +
	                   ` ${enabledPlatforms.join(', ')}.*\n\n`)
	    }
	    console.log(`Crawled ${count} new listings.`)
    })

  return exec
}()), 60 * 60 * 1000)
