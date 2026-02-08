/**
 * grunt-init-pressgang-child
 * https://github.com/pressgang-wp/pressgang-child
 *
 * Copyright (c) 2022 Benedict Wallis, contributors
 * License: MIT
 */

'use strict';
const path = require('path');

exports.description = 'Create a WordPress child theme scaffold for PressGang.';

exports.notes =
	'╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱\n' +
	'╭━━━╮╱╱╱╱╱╱╱╱╱╱╭━━━╮\n' +
	'┃╭━╮┃╱╱╱╱╱╱╱╱╱╱┃╭━╮┃\n' +
	'┃╰━╯┣━┳━━┳━━┳━━┫┃╱╰╋━━┳━╮╭━━╮\n' +
	'┃╭━━┫╭┫┃━┫━━┫━━┫┃╭━┫╭╮┃╭╮┫╭╮┃\n' +
	'┃┃╱╱┃┃┃┃━╋━━┣━━┃╰┻━┃╭╮┃┃┃┃╰╯┃\n' +
	'╰╯╱╱╰╯╰━━┻━━┻━━┻━━━┻╯╰┻╯╰┻━╮┃\n' +
	'╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╯┃\n' +
	'╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰━━╯';

exports.after =
	'Next steps:\n' +
	'1. Install deps in your generated theme with `npm install` (or `npm ci` if you committed a lockfile).\n' +
	'2. Run `npm run dev` for watch mode.\n' +
	'3. Run `npm run build` for production assets.';

exports.warnOn = '*';

exports.template = function (grunt, init, done) {
	init.process({}, [
		init.prompt('theme_slug', 'pressgang-child'),
		init.prompt('theme_name', 'PressGang Child'),
		init.prompt('textdomain', ''),
		init.prompt('composer_vendor', 'pressgang-wp'),
		init.prompt('npm_package_name', 'pressgang-child'),
		init.prompt('php_namespace_vendor', 'PressGang'),
		init.prompt('homepage', 'https://github.com/pressgang-wp/pressgang-child'),
		init.prompt('description', 'WordPress child theme scaffold for PressGang.'),
		init.prompt('version', '1.0.0'),
		init.prompt('license', 'MIT'),
		init.prompt('author_name', 'Benedict Wallis'),
		init.prompt('author_email', 'ben@benedict-wallis.com'),
		init.prompt('author_uri', 'https://benedict-wallis.com/'),
	], function (err, props) {
		if (err) {
			done(err);
			return;
		}

		props.theme_slug = toSlug(props.theme_slug);
		props.theme_name = String(props.theme_name || '').trim();
		props.textdomain = props.textdomain ? toSlug(props.textdomain) : props.theme_slug;
		props.composer_vendor = toSlug(props.composer_vendor);
		props.npm_package_name = props.npm_package_name.trim();
		props.author_name = String(props.author_name || '').trim();
		props.license = String(props.license || '').trim();
		props.php_namespace_vendor = toPascalCase(props.php_namespace_vendor);
		props.php_namespace_theme = toPascalCase(props.theme_slug);
		props.namespace = props.php_namespace_vendor + '\\' + props.php_namespace_theme;
		props.namespace_json = props.namespace.replace(/\\/g, '\\\\') + '\\\\';
		props.composer_package_name = props.composer_vendor + '/' + props.theme_slug;
		props.name = props.theme_slug;
		props.vendor = props.composer_vendor;

		const required = [
			['theme_slug', props.theme_slug],
			['theme_name', props.theme_name],
			['author_name', props.author_name],
			['textdomain', props.textdomain],
			['composer_vendor', props.composer_vendor],
			['npm_package_name', props.npm_package_name],
			['namespace', props.namespace],
			['license', props.license],
		];

		for (const [field, value] of required) {
			if (!value || !String(value).trim()) {
				grunt.fail.warn('Required field is missing: ' + field);
				done(false);
				return;
			}
		}

		const currentFolder = toSlug(path.basename(process.cwd()));
		if (currentFolder && currentFolder !== props.theme_slug) {
			grunt.fail.warn(
				'Current folder "' + currentFolder + '" does not match theme_slug "' + props.theme_slug + '". ' +
				'Create/use the target theme directory first.'
			);
			done(false);
			return;
		}

		const files = init.filesToCopy(props);
		init.addLicenseFiles(files, [props.license]);
		init.copyAndProcess(files, props);
		done();
	});
};

function toSlug(str) {
	return String(str || '')
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9-_.\s]/g, '')
		.replace(/[\s_.]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

function toPascalCase(str) {
	return String(str || '')
		.replace(/[-_]+/g, ' ')
		.replace(/[^\w\s]/g, '')
		.replace(/\s+(.)/g, function (_, chr) {
			return chr.toUpperCase();
		})
		.replace(/\s/g, '')
		.replace(/^\w/, function (chr) {
			return chr.toUpperCase();
		});
}
