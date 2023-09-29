const fs = require("fs");

const lockJson = require('./package-lock.json'); // edit path if needed
const libraries = [];
const modules = ['#types/express@4.17.1',
'#types/jest@24.0.18',
'#types/lodash@4.14.141',
'#types/node@12.7.8',
'apollo-server-express@2.11.0',
'axios@0.21.2',
'bcrypt-nodejs@0.0.3',
'body-parser@1.19.0',
'compression@1.7.4',
'cors@2.8.5',
'cross-env@6.0.3',
'dompurify@2.0.6',
'dotenv@8.1.0',
'express@4.17.1',
'express-rate-limit@5.0.0',
'graphql-iso-date@3.6.1',
'helmet@3.21.1',
'jest@24.9.0',
'jsdom@15.1.1',
'jsonwebtoken@8.5.1',
'lodash@4.17.15',
'morgan@1.9.1',
'mysql@2.17.1',
'mysql2@1.7.0',
'nodemon@1.19.3',
'rand-token@0.4.0',
'react-quill@1.3.3',
'redis@2.8.0',
'rimraf@3.0.0',
'sass@1.68.0',
'sequelize@5.19.2',
'sequelize-cli@5.5.1',
'sinon@7.5.0',
'sinon-chai@3.3.0',
'slug@1.1.0',
'ts-jest@24.1.0',
'ts-node@8.4.1',
'tslog@3.2.2',
'typescript@3.6.3',
'validator@11.1.0',
'yaml@1.10.2'].map(e => e.split("@")[0].replace("#","@"));

console.log(modules);

// Loop through dependencies keys (as it is an object)
Object.keys(lockJson.dependencies).forEach((dependencyName) => {
  const dependencyData = lockJson.dependencies[dependencyName];

  libraries.push({
    libName: dependencyName,
    libVersion: dependencyData.version,
    parent: null,
  });
  // Loop through requires subdependencies        
  if (dependencyData.requires) {
    Object.keys(dependencyData.requires).forEach((subdependencyName) => {
      const subdependencyVersion = dependencyData.requires[subdependencyName];

      libraries.push({
        libName: subdependencyName,
        libVersion: subdependencyVersion,
        parent: dependencyName,
      });
    });
  }
});

const reducedLibs = modules.map(b => {
    let lib = libraries.filter(l => l.libName == b && l.parent == null);
    let firstLib = lib.length > 0 ? lib[0] : null;
    return {
        origin: b,
        fullDep: firstLib && firstLib.libName + "@" + firstLib.libVersion
    }

});




function exportPack(name, pack) {

    fs.writeFile(name+'-gen.json', JSON.stringify(pack, null, "\t" ), 'utf8', function(err) {

    if (err) throw err;

        console.log('complete');

    });

}

 

exportPack("packagelocklist", libraries);


 

exportPack("packagelocklistInst", libraries.filter(l => l.parent == null).map(t => t.libName + "@" + t.libVersion));

exportPack("packagelist", {all: reducedLibs, short: reducedLibs.map(r => r.fullDep)});
