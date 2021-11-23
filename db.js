const fs = require('fs');
// db.js
module.exports = function () {
  
  let data = createData();
  return data;
}

//MARK: below code use for fi;e internal
function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function createData() {
  let pathLists = getFiles('./mock');
  let apiNameLists = pathLists.map(x => x.replace('./mock/','').replace('.json','').replace('/','_'));
  // console.log(pathLists);
  // console.log(apiNameLists);

  let data = {};
  pathLists.forEach((path, index) => {
    let value = apiNameLists[index];
    const api = require(path);
    data[value] = api
    // console.log(`${value} and ${api}`);
  });
  return data;
}