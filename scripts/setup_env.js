const fs = require('fs')

fs.writeFileSync('./.env', `REACT_APP_GA=${process.env.REACT_APP_GA}\n`)
