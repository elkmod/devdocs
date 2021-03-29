const fs = require("fs-jetpack");

var docsDirectories = [
    'blog',
    'developers-guide',
    'theme-guide',
    'designers-guide',
    'community',
    'labs',
];

const printDirectory = function (name, parent, indent = 0) {
    // Build absolute path
    var path = parent + "/" + name;

    if(name.endsWith(".html") || fs.exists(path) === "dir") {
        console.log("\t".repeat(indent) + "* [" + name + "](foo.md)");
    }

    if(fs.exists(path) === "file" && name.endsWith(".md")) {
        var fileContent = fs.read(path);
        var title = fileContent.match(/title: (.*)/);

        if(title && title.length > 0) {
            console.log("\t".repeat(indent) + "* [" + title[0].replace("title: ", "") + "](." + path.replace(__dirname, "") + ")");
        } else {
            console.log("\t".repeat(indent) + "* [" + name + "](foo.md)");
        }

        return;
    }

    if(fs.exists(path) === "file") {
        return;
    }

    var files = fs.list(path);


    indent++;
    for (i in files) {
        printDirectory(files[i], path, indent);
    }
};

for(i in docsDirectories) {
    printDirectory(docsDirectories[i], __dirname);
}
