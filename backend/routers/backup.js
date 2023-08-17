const express=require('express')
const asynchandler = require('express-async-handler')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process');
const router = express.Router()
require('dotenv').config()
router.post('/',asynchandler((req,res,next)=>{
  const db_name = 'chat-app'
  const archive = `${path.join(__dirname, `/${db_name}.gzip`)}`
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
        res.send(fs.readFileSync(archive,{encoding:'utf-8'}))
      }
    });
  }
  backup()
}))
module.exports = router
