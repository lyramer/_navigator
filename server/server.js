const express = require("express");
const app = express();
var netcdf4 = require("netcdf4")
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  let yr = req.query.yr;
  let m = req.query.m;
  let d = req.query.d;
  let x = req.query.x;
  let y = req.query.y;
  let fn = "../build/OLCI/" + yr + "/" + m + "/" + d + "/polymer/mosaic_output.nc";
  let fh = new netcdf4.File(fn, "r");
  let val = fh.root.variables['logchl'].readSlice(x,y);


  console.log(val);
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
