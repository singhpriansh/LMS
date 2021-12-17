const fs = require("fs");
const path = require('path');

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

exports.Movefiles_to_id = (type,file,id) => {
  const from = "backend/"+type+"/"+file;
  const to = "backend/drive/"+id+"/"+file;
  console.log(from,to);
  fs.rename(from,to, err => {
    if(err){
      console.log("Error occured moving file to drive");
    }
  })
}

exports.Createdrive = (id) => {
  fs.mkdir(path.join('backend/drive/', id.toString()),
  { recursive: true }, err => {
    if(err){
      console.log('Error creating directory')
    }else{
      console.log('Directory created successfully!');
    }
  });
}
