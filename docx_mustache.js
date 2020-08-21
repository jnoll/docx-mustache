var docx = require('docx-templates').default;
//var YAML = require('yamljs');
var YAML = require('yaml');
var yargs = require('yargs');	// command line argument parsing
var stdin = process.stdin;
var inputChunks = [];
var fs = require('fs');

// Read yaml from stdin
const argv = yargs
    .option('t', {
        alias: 'template',
        description: 'template file',
        type: 'string',
    })
    .option('y', {
        alias: 'yaml',
        description: 'data in yaml format',
        type: 'string',
    })
    .option('o', {
        alias: 'output',
        description: 'output file',
        type: 'string',
    })
    .argv;

var cont = fs.readFileSync(argv.yaml);
console.log(cont.toString());
var inputJSON = YAML.parse(cont.toString(), {merge: true});


var template = fs.readFileSync(argv.template);
docx({template
    , data: inputJSON
    , cmdDelimiter: ['{-', '-}']
    }).then(result => fs.writeFileSync(argv.output, result));
