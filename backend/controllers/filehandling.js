const fs = require("fs");
const path = require('path');

const EXT_FILE = require('../models/ext_map');

const drive = "backend/drive/";

exports.Initialise_dir = (id) => {
  this.Createdrive(id);
  this.Createfolder(drive+id,"/root")
  this.Createfolder(drive+id,"/trash");
  fs.closeSync(fs.openSync(drive+id+"/shared.txt","w"));
  this.Createfolder(drive+id+"/root","/images");
  this.Createfolder(drive+id+"/root","/documents");
  this.Createfolder(drive+id+"/root","/media");
}

exports.Movefiles_to_id = (type,file,id) => {
  const from = "backend/"+type+"/"+file;
  const to = drive+id+"/root/"+file;
  console.log(from,to);
  fs.rename(from, to, err => {
    if(err){
      console.log("Error occured moving file to drive");
    }
  })
}

exports.Deletefiles = (files,res) => {
  files.forEach(file => {
    fs.unlink(file, err => {
      if(err){
        console.log("Error occured removing file");
      }else{
        console.log(file+ " deleted");
      }
    })
  });
  return res.status(409).json({
    message: "User with id exist"
  });
}

exports.Createdrive = (id) => {
  fs.mkdir(path.join(drive, id),
  { recursive: true }, err => {
    if(err){
      console.log('Error creating directory')
    }else{
      console.log('Directory created for :',id);
    }
  });
}

exports.Createfolder = (basepath,name) => {
  return fs.mkdir(path.join(basepath,name),
  { recursive: true }, err => {
    if(err){
      console.log('Error creating folder at',basepath,err)
    }
  });
}

exports.Createfile = (basepath,file) => {
  fs.closeSync(fs.openSync(basepath+file,"w"))
}

exports.Filetype = (filename) => {
  const ext = filename.split(".");
  return EXT_FILE.MAP[ext[ext.length-1]];
}

exports.Viewfolder = (req,res) => {
  const id = req.userData.id;
  const path = req.body.path;
  const content = {
    files: [],
    folders: []
  };
  let loc;
  if(req.body.loc == 'Shared'){
    // console.log("Cannot be processed now");
    return res.status(200).json({
      message:"No Folders here",
      content: content
    })
  }else{
    if(req.body.loc == 'Drive'){
      loc = '/root';
    }else if(req.body.loc == 'Trash'){
      loc = '/trash';
    }else{
      return res.status(404).json({
        message: "Resource not found"
      })
    }
    const totpath = drive+id+loc+path;
    fs.readdirSync(totpath).forEach(
      file => {
        file = Object.assign({name:file},fs.statSync(totpath + "/" + file));
        if(fs.statSync(totpath + "/" + file.name).isDirectory()){
          content.folders.push(file);
        } else {
          file = Object.assign(file,{type:this.Filetype(totpath + "/" + file.name)})
          content.files.push(file);
        }
    });
    return res.status(200).json({
      message: "content retrieved",
      content: content
    })
  }
}