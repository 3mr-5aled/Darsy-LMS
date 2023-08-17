const express=require('express')
const path = require("path")
require('dotenv').config()
const router = express.Router()
router.post('/',async(req,res)=>{
const db_name = 'course'
    const archive = `${path.join(__dirname, `../${db_name}.gzip`)}`
    const backup = function () {
        const child = spawn('mongodump', [
          `--uri=${process.env.URL_BACKUP}`,
          `--db=${db_name}`,
          `--archive=${archive}`,
          '--gzip',
        ])
        child.stdout.on('data', (data) => {
          console.log('stdout:\n', data);
        });
        child.stderr.on('data', (data) => {
          console.log('stderr:\n');
        });
        child.on('error', (error) => {
          console.log('error:\n',error);
        });
        child.on('exit', (code, signal) => {
          if (code) console.log('Process exit with code:', code);
          else if (signal) console.log('Process killed with signal:', signal);
          else {
            console.log('success')
            res.sendFile(archive)
          }
        });
      }
      backup()
})
module.exports = router