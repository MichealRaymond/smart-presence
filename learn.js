import fs from "node:fs";
 import fs from 'node:fs'
 import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {mkdir} from 'node:fs'

//const text = "This is how write into a node js file";
//create a file
//fs.writeFile("createdfile.pdf", text, (error) => {
//  if (error) throw error;
//
//  console.log("File created successfully");
//});

//read a file
//fs.readFile("./collins.pdf", (err, data) => {
//  if (err) console.log("Something went wrong" + err);
//  console.log(data);
//});


//const filename = fileURLToPath(import.meta.url);
//const dirname = dirname(filename);
//
//console.log(filename);
//console.log(dirname);
//
///*fs.mkdir('./uploads/profile-pics')*/
//mkdir(dirname + "/uploads/profile-pics", { recursive: true }, (err) => {
//  if (err) return console.log("Error found:" + err);
//  console.log("Directory cerated successfully");
//});
//mkdir(dirname + "/docs", (err) => {
//  if (err) return console.log("Error here:" + err);
//  console.log("Created Successfully");
//});

// terminal = node serve
