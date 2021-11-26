const { urlencoded } = require('express');
var express = require('express');
var router = express.Router();
const jsonParser = express.json()

const hbs = require("hbs");

var connect = require("../database");
var connection = connect.connection

// HELPERS
// If equals helper
hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
});


var data = {project:[],users:[]}

// GET HOME PAGE 
router.get("/", function(req, res){
  connection.query("SELECT * FROM project", function(err, results) {
    data.project = results
  });
  connection.query("SELECT * FROM users", function(err, results) {
    if(err) return console.log(err);
    data.users = results
    res.render("index.hbs", data);
  });
});


// USRERS REQUESTS
router.post('/add_user', jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  if (!request.body.username.trim()) {
    request.body.error = 1405
    return response.json(request.body)
  } 
  connection.query("INSERT INTO users (name) VALUE (?)", request.body.username, function(err, results) {
    if (err) {
      request.body.error = err.errno;
      response.json(request.body);
      return
    }
    request.body.insertId = results["insertId"]
    response.json(request.body)
  });
})

router.delete('/delete_user', jsonParser, function(request, response) {
  if (!request.body) return response.sendStatus(400)
  connection.query("DELETE FROM users WHERE idusers=?", request.body.userid, function(err, data) {
    if (err) return console.log(err);
  });
  response.json(request.body)
})

router.put('/edit_user', jsonParser, function(request, response){
  if(!request.body) return response.sendStatus(400);
  if (!request.body.username.trim()) {
    request.body.error = 1405
    return response.json(request.body)
  } 
  connection.query("UPDATE users SET name=? WHERE idusers=?", [request.body.username,request.body.userid], function(err, data){
    if (err) {
      console.log(err);
      request.body.error = err.errno;
      response.json(request.body);
      return
    }
    response.json(request.body)
  })
})

// PROJECT REQUESTS
router.post('/add_project', jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400)
  if (!request.body.projectname.trim()) {
    request.body.error = 1405
    return response.json(request.body)
  } 
  connection.query("INSERT INTO project (project_name) VALUE (?)", request.body.projectname, function(err, results) {
    if (err) {
      request.body.error = err.errno;
      response.json(request.body);
      return
    }
    request.body.insertId = results["insertId"]
    response.json(request.body)
  });
})

router.delete('/delete_project', jsonParser, function(request, response) {
  if (!request.body) return response.sendStatus(400)
  connection.query("DELETE FROM project WHERE idproject=?", request.body.projectid, function(err, data) {
    if(err) return console.log(err);
  });
  response.json(request.body)
})

router.put('/edit_project', jsonParser, function(request, response){
  if(!request.body) return response.sendStatus(400);
  if (!request.body.projectname.trim()) {
    request.body.error = 1405
    return response.json(request.body)
  } 
  connection.query("UPDATE project SET project_name=? WHERE idproject=?", [request.body.projectname,request.body.projectid], function(err, data){
    if (err) {
      request.body.error = err.errno;
      response.json(request.body);
      return
    }
    response.json(request.body)
  })  
})

router.put('/change_project_user', jsonParser, function(request, response){
  if(!request.body)return response.res.sendStatus(400);
  connection.query(`UPDATE project SET ${request.body.day}=? WHERE idproject=?`, [ request.body.user, request.body.projectid], function(err,date){
    if(err) return console.log(err);
  })
  response.json(request.body)
})

module.exports = router;
