const baseUrl = 'https://raw.githubusercontent.com/jenheilemann/bitburner/master/src/'
const filesToDownload = [
  'BestHack.js',
  'Botnet.js',
  'Buyer.js',
  'Find.js',
  'groupBy.js',
  'HackNet.js',
  'Network.js',
  'Rooter.js',
  'Whisperer.js',
  'Zombifier.js',
]
const valuesToRemove = []

function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting initHacking.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  for (let i = 0; i < filesToDownload.length; i++) {
    const filename = filesToDownload[i]
    const path = baseUrl + filename
    await ns.scriptKill(filename, 'home')
    await ns.rm(filename)
    await ns.sleep(200)
    ns.tprint(`[${localeHHMMSS()}] Trying to download ${path}`)
    await ns.wget(path + '?ts=' + new Date().getTime(), filename)
  }

  valuesToRemove.map((value) => localStorage.removeItem(value))

  ns.tprint(`[${localeHHMMSS()}] Starting Hacknet.js`)
  ns.run('Hacknet.js', 1)
  ns.tprint(`[${localeHHMMSS()}] Starting Buyer.js`)
  ns.run('Buyer.js', 1)
  ns.tprint(`[${localeHHMMSS()}] Spawning Botnet.js`)
  ns.spawn('Botnet.js', 1)
}
