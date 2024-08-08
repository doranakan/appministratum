const parseMunitorumFieldManual = async (pdfText: string) => {
  const entries = pdfText.split(`\n`)

  console.log({ entries })

  let armyName = ''
  let enhancementsName = ''
  let entryName = ''
  let type = 'units'

  const codexes: Record<
    string,
    {
      detachmentEnhancements: Record<string, { name: string; pts: number }[]>
      units: Record<string, { models: number; pts: number }[]>
    }
  > = {}

  for (const entry of entries) {
    if (entry === 'DETACHMENT ENHANCEMENTS') {
      codexes[armyName].detachmentEnhancements = {}
      type = 'enhancements'
    } else if (entry === 'FORGE WORLD POINTS VALUES') {
      //DO NOTHING
    } else if (entry.includes('CODEX:') || entry.includes('INDEX:')) {
      type = 'units'
      armyName = entry.slice(7)
      codexes[armyName].units = {}
    } else if (
      entry.length &&
      isNaN(Number(entry)) &&
      entry != 'undefined' &&
      !entry.includes('model')
    ) {
      if (type === 'enhancements') {
        if (entry.includes('pts')) {
          const entryArr = entry.split(' ')
          const name = entryArr[0].trim()
          const pts = Number(
            entryArr[entryArr.findIndex((v) => !isNaN(Number(v[0])))].split(
              ' '
            )[0]
          )
          codexes[armyName].detachmentEnhancements[enhancementsName].push({
            name,
            pts
          })
        } else {
          enhancementsName = entry
          codexes[armyName].detachmentEnhancements[entry] = []
        }
      } else {
        entryName = entry
        codexes[armyName].units[entry] = []
      }
    } else if (entry.includes('model')) {
      const entryArr = entry.split('.')
      const models = Number(entryArr[0].split(' ')[0])
      entryArr.shift()
      const pts = Number(
        entryArr[entryArr.findIndex((v) => !isNaN(Number(v[0])))].split(' ')[0]
      )
      codexes[armyName].units[entryName].push({ models, pts })
    }
  }

  console.log(JSON.stringify(codexes, undefined, 2))
}

const pagerender = (pageData) => {
  if (pageData.pageIndex === 0) {
    return undefined
  }

  //check documents https://mozilla.github.io/pdf.js/
  const render_options = {
    //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
    normalizeWhitespace: false,
    //do not attempt to combine same line TextItem's. The default value is `false`.
    disableCombineTextItems: false
  }

  return pageData.getTextContent(render_options).then((textContent) => {
    let lastY,
      text = ''

    const army = `${textContent.items.shift().str}`

    for (const item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
        text += item.str
      } else {
        text += '\n' + item.str
      }
      lastY = item.transform[5]
    }
    return `${army}\n${text}`
  })
}

export default parseMunitorumFieldManual
