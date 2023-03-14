#!/usr/bin/env node
//~To start this server, run "npm run start"
//~Run "npm install" before to get all node mod dependencies
//~
//~To run as developer (edits update live), run "npm run dev"
//~To quit, hit ctrl+C

//? Sources:
//? https://blog.logrocket.com/understanding-api-key-authentication-node-js/
//? https://blog.hubspot.com/website/what-is-rest-api
//?
//? https://www.geeksforgeeks.org/express-js-res-sendfile-function/
//? http://expressjs.com/en/api.html#express.json


/*********************************************************************
 ** Global variables
 *********************************************************************/
 var path = require("path");
 var fs = require("fs")
 var express = require("express")
 //
 var app = express()
 var port = process.env.PORT || 3000;
 var foldername = process.env.GRADE_FOLDER || "gradebooks"      // path routing
 var gradebook_dir = "./" + foldername                          // relative path


// Set express app server to listen to a port, default is 3000
app.listen(port, function () {
    console.log("== Server is listening on port: ", port)
})


/*********************************************************************
 ** Function: (Logger)
 ** Description:
 **     Logging request information
 ** Parameters: req, res, next
 *********************************************************************/
 app.use(function (req, res, next) {
    console.log("=== Request recieved ===")
    console.log("method: ", req.method)
    console.log("url: ", req.url)
    console.log("path: ", req.path)
    console.log("query: ", req.query)

    next()		// Go to next middleware function
})


// /*********************************************************************
//  ** Function: HTTP GET HANDLE
//  ** Description: Handle get request for csv file
//  ** Parameters: req, res, next
//  *********************************************************************/
// app.get("/files",function (req, res, next) {
//     // console.log("req.query: ", req.query['api_key'])
//     // console.log("list: ", files)
//     // console.log("type: ", typeof(files))

//     // Get list of csv files
//     fs.readdir(gradebook_dir, function (error, files) {
//         if (error) {
//             res.status(500).send("Could not locate files")
//             console.log("ERROR: dir could not be read")
//         }
//         else {
//             res.status(200).send(files.join())
//         }
//     })
// })


// /*********************************************************************
//  ** Function: HTTP GET HANDLE
//  ** Description: Get request for returning contents csv file, including header
//  ** Parameters: req, res, next
//  **             :file = file to send contents of (csv)
//  *********************************************************************/
//  app.get("/files/:file",function (req, res, next) {
//     var file = req.params.file
//     var csv_path = path.join(__dirname, "/", foldername, "/", file)
//     console.log("csv_path: ", csv_path)

//     res.status(200).sendFile(path.join(__dirname, "/", foldername, "/", file))
// })


// // =======================================================================================
// // POST ==================================================================================
// // =======================================================================================


// app.use(express.json())     // NEED to be able to parse json body


// /*********************************************************************
//  ** Function: HTTP POST HANDLE
//  ** Description: Handle post request to create a new gradebook csv file
//  ** Parameters: req, res, next
//  **             :file = file to write to (csv)
//  *********************************************************************/
// app.post("/files/:file/new", function (req, res, next) {
//     // Get filename to write to
//     var file = req.params.file
//     console.log("req.headers: ", req.headers)
//     console.log("re.body: ", req.body)

//     // Async
//     fs.writeFile(
//         gradebook_dir + "/" + file,
//         req.body.header + req.body.grades,
//         function (err) {
//             if (err) {
//                 res.status(500).send("File could not be written")
//             } else {
//                 res.status(200).send("File created successfully")
//             }
//         }
//     )
// })


// /*********************************************************************
//  ** Function: HTTP POST HANDLE
//  ** Description: Handle post request to add new grades to a csv file
//  ** Parameters: req, res, next
//  **             :file = file to append to (csv)
//  *********************************************************************/
//  app.post("/files/:file/add", function (req, res, next) {
//     // Get filename to append to
//     var file = req.params.file
//     console.log("req.headers: ", req.headers)
//     console.log("re.body: ", req.body)

//     // Async
//     fs.appendFile(
//         gradebook_dir + "/" + file,
//         req.body.grades,
//         function (err) {
//             if (err) {
//                 res.status(500).send("File could not be updated")
//             } else {
//                 res.status(200).send("File updated successfully")
//             }
//         }
//     )
// })


// =======================================================================================
// 404 ERROR =============================================================================
// =======================================================================================


/*********************************************************************
 ** Function: HTTP GET HANDLE
 ** Description: Handle get request for unknown cases (404 error)
 ** Parameters: req, res, next
 *********************************************************************/
app.get("*", function (req, res, next) {
    res.status(404).send("404: Bad request :(")
})
