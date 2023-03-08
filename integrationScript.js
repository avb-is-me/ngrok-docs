const fs = require('fs/promises');
const path = require('path');

var existingItems = require("./copyOfIntegrationItems.json")

var upperCaseReplaceSlashes = function(string) {
    var subDirName = `${string[0].toUpperCase()}${string.slice(1)}`
    subDirName = subDirName.replace(/-/g, " ")
    return subDirName
}

var sortAlphabetically = async function(itemsArray) {
    const sortedItems = itemsArray.sort(function (a, b) {
        if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
      });
    return sortedItems
}

async function findintegrationSubdirs() {
  const dirPath = './docs/integrations';
  let integrationSubdirs = [];


  // Get list of all directories in `thing`
  const dirContents = await fs.readdir(dirPath, { withFileTypes: true });
  const subDirs = dirContents.filter(item => item.isDirectory()).filter(function(subdir) { 
    const label = upperCaseReplaceSlashes(subdir.name)
    const existingIntegration = existingItems.items.find(function(item) { return item?.id?.includes(subdir.name) || item.label.toUpperCase() == label.toUpperCase()})
    if(!existingIntegration) return true
  })

  for (const subdir of subDirs) {
    const subdirPath = path.join(dirPath, subdir.name);
    const subdirContents = await fs.readdir(subdirPath);
    const mdFiles = subdirContents.filter(file => path.extname(file) === '.md');
    console.log(mdFiles)
    var subDirName = upperCaseReplaceSlashes(subdir.name)
    const item = { "label": subDirName, "type": "doc" }
    if (mdFiles.length > 1) {
        item["items"] = [ { "type": "autogenerated", "dirName": `integrations/${subdir.name}` }]
        item["type"] = "category"
        delete item["id"]
        if(item.label != "Template") integrationSubdirs.push(item)
    } else if(mdFiles.length == 1) {
        const filename = mdFiles[0]
        var justFileName = filename.split(".md")[0]
        console.log("this the filename", filename)
        item["id"] = `integrations/${subdir.name}/${justFileName}`
        if(item.label != "Template") integrationSubdirs.push(item)
    }
  }

  const itemsToAdd = await sortAlphabetically([...existingItems.items, ...integrationSubdirs])
  const newItems = {items: itemsToAdd}
  await fs.writeFile('./integrationItems.json', JSON.stringify(newItems, null, 3));
}

findintegrationSubdirs();
