const express = require("express");
const axios = require("axios");
var ZYHM = require("zyhm");
const app = express();
const port = 8080;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("./public/index.html");
});
app.get("/download", (req, res) => {
  res.download("./public/Verzy_1.0.apk");
});
app.get("/api", (req, res) => {
  res.send("Mending Follow IG gw:v");
});

app.get("/api/create", (req, res) => {
  let whu = req.query.whu;
  let whk = req.query.whk;
  let whh = req.query.whh;
  let user = req.query.user;
  let domaen = req.query.domain;
  let pass = req.query.pass;
  if (!whu && !whk && !whh && !user && !domaen && !pass && !peck)
    return res.send({ status: false });
  var ZYHMClient = new ZYHM.Client({
    serverUrl: "https://" + whh + ":2087",
    remoteAccessKey: whk,
    username: whu,
  });

  let peck = req.query.packages;
  ZYHMClient.createAccount({
    username: user,
    password: pass,
    plan: peck,
    domain: domaen,
  }).then(
    function (success) {
      let inc = "";
      if (success.metadata.reason == "Account Creation Ok") {
        let output_meta = success.metadata.output.raw;
        var subs = output_meta.substring(
          output_meta
            .toString()
            .indexOf("+===================================+")
        ); //substr = 'Pick Only Account Info'
        let ditzz = subs.split("| Language: en")[0];
        let datas = success.data;
        inc = {
          status: true,
          data: datas,
          information: ditzz,
        };
      } else {
        inc = success;
      }
      console.log(inc);
      res.json(inc);

      // do something with data
    },
    function (error) {
      console.error(error);
      res.send(error);

      // do something with data
    }
  );
});

app.get("/api/listacct", (req, res) => {
  let whu = req.query.whu;
  let whk = req.query.whk;
  let whh = req.query.whh;
  if (!whu && !whk && !whh) return res.send({ status: false });
  let authWhm = { headers: { Authorization: `WHM ${whu}:${whk}` } };
  axios
    .get(`https://${whh}:2087/json-api/listaccts?api.version=1`, authWhm)
    .then((risol) => {
      let lisol = risol.data;

      var ttdy = lisol.data.acct;
      if (!ttdy)
        return res.json({
          error: lisol,
        });
      res.json(ttdy);
      console.log(ttdy);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/api/listpkg", (req, res) => {
  let whu = req.query.whu;
  let whk = req.query.whk;
  let whh = req.query.whh;
  if (!whu && !whk && !whh) return res.send({ status: false });
  let authWhm = { headers: { Authorization: `WHM ${whu}:${whk}` } };
  axios
    .get(`https://${whh}:2087/json-api/listpkgs?api.version=1`, authWhm)
    .then((riol) => {
      if (!riol.data.data.pkg) return console.log("GA ADA DEKS");
      let liso = riol.data;
      var pkgl = liso.data.pkg;

      res.json(pkgl);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
