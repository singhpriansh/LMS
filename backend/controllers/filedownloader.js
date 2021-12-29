const fs = require("fs")

const drive = "backend/drive/";

exports.Download = (req,res,next) => {
  let loc = "";
  if(req.body.loc == 'Drive'){
    loc = drive+ req.userData.id +'/root'+ req.body.path + req.body.item;
  }else if(req.body.loc == 'Shared'){
    loc = '/shared';
  }else{
    return res.status(404).json({
      message: "Resource not found"
    })
  }
  res.status(200).download(loc);
  console.log("Downloaded:",loc);
  return;
}