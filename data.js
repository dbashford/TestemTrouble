var path = require('path'),
  fs = require('fs'),
  esprima = require('esprima'),
  escodegen = require('escodegen'),
  wrench = require('wrench')
  folder = path.join(__dirname, "public", "javascripts");

var __defineCallbackBody = function(p) {
  return p.expression && p.expression.callee && p.expression.callee.name && p.expression.callee.name === "define";
};

var __isObjectNotNull = function(o) {
  return typeof o === 'object' && o !== null;
};

var __traverse = function(node, breakAt, func) {
  var child, key, _results;
  func(node);
  if (typeof breakAt === "function" ? breakAt(node) : void 0) {
    return;
  }
  _results = [];
  for (key in node) {
    child = node[key];
    if (__isObjectNotNull(child)) {
      if (Array.isArray(child)) {
        _results.push(child.forEach(function(node) {
          return __traverse(node, breakAt, func);
        }));
      } else {
        _results.push(__traverse(child, breakAt, func));
      }
    }
  }
  return _results;
};

var allFiles = wrench.readdirSyncRecursive(folder).map(function(filePath){
  // rebuild pull path
  return path.join(folder, filePath);
}).filter(function(filePath) {
  // just files thx
  return fs.statSync(filePath).isFile();
}).filter(function(filePath) {
  // not vendor
  return (!(/\/vendor\//).test(filePath));
}).filter(function(filePath) {
  // not specs
  return (!(/\/spec\//).test(filePath));
}).map(function(filePath) {
  var source = fs.readFileSync(filePath).toString()
  return {
    filePath:filePath,
    parsed:esprima.parse(source)
  }
}).map(function(file) {
  // nuke callbacks, no looking under the skirt
  __traverse(file.parsed, __defineCallbackBody, function(node) {
    if (__defineCallbackBody(node)) {
      var args = node.expression.arguments
      if (args[1]) {
        args[1].body.body = []
      } else {
        args[0].body.body = []
      }
    }
  })
  return file;
}).map(function(file) {
  // coffeescript gunk
  var b = file.parsed.body;
  if (Array.isArray(b) && b.length > 0 && b[0].type === "VariableDeclaration" && b[0].declarations && b[0].declarations[0].id.name === "__bind" ) {
    b.splice(0, 1)
  } else {
    if (Array.isArray(b) && b.length > 0 && b[0].type === "VariableDeclaration" && b[0].declarations && b[0].declarations[0].id.name === "__hasProp" ) {
      b.splice(0, 1)
    }
  }
  return file;
}).map(function(file) {
  // regen source
  file.rewritten = escodegen.generate(file.parsed);
  return file;
}).forEach(function(file) {
  //write
  fs.writeFileSync(file.filePath, file.rewritten);
});
