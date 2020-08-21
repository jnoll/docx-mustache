Docx template program to populate a Word document from yaml data.

Usage: node docx_mustache.js -t template.docx -y input_data.yaml -o output.docx

Variables in the template between "{{" and "}}" are interpolated from
the yaml input, according to the
[docx-templates syntax](https://www.npmjs.com/package/docx-templates).

If variables referenced in the template are not present in the input
data, node will throw an exception.  So, for example, if the template
contains

    {{foo}}
    
but the yaml file does not, node will report:

    (node:4553) UnhandledPromiseRejectionWarning: Error: Error executing command 'foo'. ReferenceError: foo is not defined

Annoyance: in '|' blocks, the _yaml_ package converts newlines to
'\n' which are just ignored by Word rather than being replaced by ' '
or a hard newline.  This is correct yaml behavior, but Word doesn't
recognize '\n' as either whitespace or a paragraph end.

Use '>' (fold newlines) or just plain "block scalars".
