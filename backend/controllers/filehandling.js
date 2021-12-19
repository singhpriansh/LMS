const fs = require("fs");
const path = require('path');

const drive = "backend/drive/";

exports.Initialise_dir = (id) => {
  this.Createdrive(id);
  this.Createfolder(drive+id,"/root");
  this.Createfolder(drive+id,"/trash");
  this.Createfile(drive+id,"/shared.txt");
}

exports.Movefiles_to_id = (type,file,id) => {
  const from = "backend/"+type+"/"+file;
  const to = drive+id+"/root/"+file;
  console.log(from,to);
  fs.rename(from,to, err => {
    if(err){
      console.log("Error occured moving file to drive");
    }
  })
}

exports.Deletefiles = (files,res) => {
  files.forEach(file => {
    fs.unlink(file,err => {
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
  fs.mkdir(path.join(drive, id.toString()),
  { recursive: true }, err => {
    if(err){
      console.log('Error creating directory')
    }else{
      console.log('Directory created for :',id);
    }
  });
}

exports.Createfolder = (basepath,name) => {
  fs.mkdir(path.join(basepath,name),
  err => {
    if(err){
      console.log('Error creating folder')
    }else{
      console.log('Folder created successfully!');
    }
  });
}

exports.Createfile = (basepath,file) => {
  fs.closeSync(fs.openSync(basepath+file,"w"))
}