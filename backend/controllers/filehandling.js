const fs = require("fs");
const path = require('path');

const drive = "backend/drive/";

exports.Initialise_dir = (id) => {
  this.Createdrive(id);
  this.Createfolder(drive+id,"/root");
  this.Createfolder(drive+id,"/trash");
  fs.closeSync(fs.openSync(drive+id+"/shared.txt","w"));
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

exports.Filetype = (file) => {
  console.log(file);
  const ext = file.split(".");
  console.log(ext[ext.length-1]);
}

exports.Viewfolder = (req,res) => {
  const id = req.userData.id;
  const path = req.body.path;
  let loc;
  if(req.body.loc == 'Shared'){
    console.log("Cannot be processed now");
    return res.status(200).json({
      message:"No Folders here"
    })
  }else{
    if(req.body.loc == 'Drive'){
      loc = '/root';
    }else if(req.body.loc == 'Trash'){
      loc = '/trash';
    }else{
      res.send(404).json({
        message: "Resource not found"
      })
    }
    const totpath = drive+id+loc+path;
    console.log("Path:",totpath);
    const files = {
      files: [],
      folders: []
    };
    fs.readdirSync(totpath).forEach(
      file => {
        if(fs.statSync(totpath + "/" + file).isDirectory()){
          files.folders.push(file);
        }else{
          files.files.push(file);
          this.Filetype(file)
        }
    });
    return res.status(200).json({
      files: files
    })
  }
}