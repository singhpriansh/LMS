const fs = require("fs")

const drive = "backend/drive/";

exports.Download = (req,res) => {
  let loc = "";
  if(req.body.location.loc == '/root'){
    loc = drive + req.userData.id + 
    '/root' + req.body.location.path + req.body.item;
  } else if(req.body.loc == 'Shared'){
    loc = '/shared';
  } else {
    return res.status(404).json({
      message: "Resource not found"
    })
  }
  return res.status(200).download(loc);
}