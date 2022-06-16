const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (error) => {
    if (error) {
      console.log(error);
    }
  })
}


function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (item) => {
        body += item.toString()
      })

      req.on('end', () => {
        resolve(body)
      })


    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  writeDataToFile,
  getRequestBody
}
