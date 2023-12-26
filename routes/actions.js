var express = require('express');
var router = express.Router();
const cors = require('cors');

var corsOptions = corsOptions = { origin: false } 
const { exec } = require('child_process')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource for actions');
});
router.options('*', cors())
router.post('/', cors(), function (req, res, next) {
  const { endpoint, body } = req.body;

  try {
    const curlCommand = `curl --location '${endpoint}' --header 'Content-Type: application/json' --data '${JSON.stringify(body)}'`;

    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error al ejecutar curl:', error);
        res.status(500).json({ status: 500, error: 'Error al ejecutar curl' });
        return;
      }

      console.log('Resultado de curl:', stdout);
      res.status(200).json({ status: 200, result: stdout });
    });
  } catch (error) {
    console.error('Error al ejecutar la acción:', error);
    res.status(500).json({ status: 500, error: 'Error al ejecutar la acción' });
  }
});

module.exports = router;
