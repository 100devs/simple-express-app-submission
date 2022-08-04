// https://github.com/pahen/madge#api
const madge = require('madge')

async function generateGraph(madge) {
    const outputName = `dependency_graph_${Date.now()}.svg`

    const serverFile = await madge('server.js')
    // To generate images, we require an optional dependency:
    // https://www.graphviz.org/download/
    const graphImage = await serverFile.image(outputName)
    console.log(`Graph image saved to ${graphImage}`)
}

generateGraph(madge)