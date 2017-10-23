/*
 * grunt-init-pressgang-child
 * https://github.com/benedict-w/pressgang
 *
 * Copyright (c) 2016 Benedict Wallis, contributors
 * GNU General Public License v2 or later
 */

'use strict';

exports.description = 'Create a basic Wordpress childtheme for Pressgang.';

// template-specific notes displayed before question prompts
exports.notes = '';

// template-specific notes displayed after question prompts
exports.after = '';

// any existing file or directory matching this wildcard will cause a warning
exports.warnOn = '*';

// the actual init template.
exports.template = function(grunt, init, done) {

    init.process({}, [

        // prompt
        init.prompt('name', "pressgang-child"),
        init.prompt('homepage', "https://github.com/benedict-w/pressgang-child"),
        init.prompt('description', "Wordpress child theme for pressgang."),
        init.prompt('version', "1.0.0"),
        // init.prompt('licenses', "GPL-2.0"),
        init.prompt('author_name', "Benedict Wallis"),
        init.prompt('author_email', "ben@benedict-wallis.com"),
        init.prompt('author_uri', "http://www.benedict-wallis.com")

    ], function(err, props) {

        // get the root files
        var files = init.filesToCopy(props);

        // add licenses
        // init.addLicenseFiles(files, props.licenses);

        console.log( files );

        // process and copy
        init.copyAndProcess(files, props);

        // generate package.json file for npm and grunt
        init.writePackageJSON('package.json', props);

        done();
    });

};