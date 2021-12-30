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

exports.Movefiles = (from,to) => {
  fs.rename(from, to, err => {
    if(err){
      console.log("Error occured moving file to drive");
    }
  })
}

exports.Deletefile = (file,res) => {
  fs.unlink(file, err => {
    if(err){
      console.log("Error occured removing file",err);
    }else{
      console.log(file+ " deleted");
    }
  });
  return res.status(201).json({
    message: "File deleted"
  });
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
  return res.status(201).json({
    message: "Files deleted"
  });
}

exports.Createdrive = (id) => {
  fs.mkdir(path.join(drive, id),
  { recursive: true }, err => {
    if(err){
      console.log('Error creating directory')
    } else { 
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
  const content = {
    files: [],
    folders: []
  };
  if(req.body.loc == '/shared'){
    // console.log("Cannot be processed now");
    return res.status(200).json({
      message:"No Folders here",
      content: content
    })
  }else{
    if(req.body.loc != '/root' && req.body.loc != '/trash'){
      return res.status(404).json({
        message: "Resource not found"
      })
    }
    const totpath = drive + req.userData.id + req.body.loc + req.body.path;
    fs.readdirSync(totpath).forEach(
      file => {
        file = Object.assign({name:file},fs.statSync(totpath + "/" + file));
        if(fs.statSync(totpath + "/" + file.name).isDirectory()){
          file = Object.assign(file,{type:"folder"});
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

exports.Move = (req,res) => {
  if(req.body.from.loc == req.body.to.loc &&
     req.body.from.path == req.body.to.path){
    return res.status(200).json({
      message : "Action cannot be done"
    })
  }
  if(req.body.from.loc == '/shared'){
    return res.status(200).json({
      message: "Cannot be shared now"
    })
  }
  if(req.body.to.loc == '/shared'){
    return res.status(200).json({
      message: "Cannot be move to drive"
    })
  }else if(req.body.to.loc == 'delete'){
    const initial = drive + req.userData.id + req.body.from.loc
    + req.body.from.path + req.body.from.item;
    return this.Deletefile(initial,res)
  }
  const initial = drive + req.userData.id + req.body.from.loc
   + req.body.from.path + req.body.from.item;
  const toloc = drive + req.userData.id + req.body.to.loc
   + req.body.to.path + req.body.to.item;
  this.Movefiles(initial, toloc);
  return res.status(200).json({
    message:"File moved"
  })
}