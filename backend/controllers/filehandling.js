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

exports.Movefile = (from,to) => {
  fs.rename(from, to, (err) => {
    if(err) {
      console.log("Error occured moving file",err);
    }
  })
}

exports.Copyfile = (from,to) => {
  fs.copyFile(from, to, (err) => {
    if(err) {
      console.log("Error occured coping file",err);
    }
  })
}

exports.Deletefile = (file) => {
  fs.unlink(file, err => {
    if(err){
      console.log("Error occured removing file",err);
    }else{
      console.log(file+ " deleted");
    }
  });
}

exports.Deletefolder = (folder) => {
  try {
    fs.rmSync(folder, { recursive: true, force: true });// delete folder
  } catch (err) {
    console.log("Error occured removing file",err);
  }
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
  if(req.body.loc === '/shared'){
    // console.log("Cannot be processed now");
    return res.status(200).json({
      message:"No Folders here",
      content: content
    })
  }
  if(req.body.loc !== '/root' && req.body.loc !== '/trash'){
    return res.status(404).json({
      message: "Resource not found"
    })
  }
  if(req.body.loc === '/trash' && req.body.path !== '/'){
    return res.status(403).json({
      message : "Cannot browse trash"
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

exports.New = (req,res) => {
  if(req.body.loc !== '/root'){
    return res.status(403).json({
      message : "Action cannot be done"
    })
  }
  const path = drive + req.userData.id + req.body.loc
    + req.body.path;
  // console.log(path);
  this.Createfolder(path,req.body.name)
  return res.status(201).json({
    message:"Operation done"
  })
}

exports.Rename = (req,res) => {
  if(req.body.loc !== '/root' || req.body.initial_name == req.body.final_name){
    return res.status(403).json({
      message : "Action cannot be done"
    })
  }
  const initial_loc = drive + req.userData.id + req.body.loc
    + req.body.path + req.body.initial_name;
  const final_loc = drive + req.userData.id + req.body.loc
    + req.body.path + req.body.final_name;
  // console.log(initial_loc,final_loc);
  this.Movefile(initial_loc, final_loc);
  return res.status(200).json({
    message:"Operation done"
  })
}

exports.Move = (req,res) => {
  if(req.body.from.loc == req.body.to.loc &&
     req.body.from.path == req.body.to.path){
    return res.status(403).json({
      message : "Action cannot be done"
    })
  }
  if(req.body.from.loc == '/shared'){
    return res.status(400).json({
      message: "Cannot be shared now"
    })
  }
  if(req.body.to.loc == '/shared'){
    return res.status(400).json({
      message: "Cannot be move to drive"
    })
  } else if(req.body.to.loc == 'delete'){
    if(req.body.items){
      req.body.items.forEach(item => {
        const location = drive + req.userData.id + req.body.from.loc
        + req.body.from.path + item;
        if(fs.statSync(location).isDirectory()){
          this.Deletefolder(location);
        } else {
          this.Deletefile(location);
        }
      });
    } else {
      if(req.body.from.loc === "/trash"){
        this.Deletefolder(drive + req.userData.id + req.body.from.loc);
        this.Createfolder(drive + req.userData.id, "/trash");
      }
    }
  }else{
    req.body.items.forEach(item => {
      // console.log(item)
      const initial_loc = drive + req.userData.id + req.body.from.loc
       + req.body.from.path + item;
      const final_loc = drive + req.userData.id + req.body.to.loc
       + req.body.to.path + item;
      console.log(initial_loc,final_loc)
      this.Movefile(initial_loc, final_loc);
    })
  }
  return res.status(200).json({
    message:"Operation done"
  })
}

exports.Copy = (req,res) => {
  if(req.body.from.loc !== '/root' || req.body.to.loc !== '/root'){
    return res.status(403).json({
      message: "Operation cannot be performed"
    })
  }
  req.body.items.forEach(item => {
    // console.log(item)
    const initial_loc = drive + req.userData.id + req.body.from.loc
     + req.body.from.path + item;
    const final_loc = drive + req.userData.id + req.body.to.loc
     + req.body.to.path + item;
    // console.log(initial_loc,final_loc)
    this.Copyfile(initial_loc, final_loc);
  })
  return res.status(200).json({
    message:"Operation done"
  })
}