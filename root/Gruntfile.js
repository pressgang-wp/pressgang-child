/**
 * Grunt configuration for the generated PressGang child theme.
 *
 * Task map:
 * - clean: remove compiled assets or release zips
 * - styles: compile SCSS and run PostCSS (autoprefixer)
 * - styles:build: styles + cssnano minification
 * - scripts: concatenate and minify JS when source files exist
 * - lint: run stylelint on SCSS
 * - dev: build once and watch source files
 * - build: production-oriented compile
 * - package: build + zip release artifact
 */
module.exports = function (grunt) {
	'use strict';

	const autoprefixer = require('autoprefixer');
	const cssnano = require('cssnano');
	const sass = require('sass');
	const stylelint = require('stylelint');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			assets: ['css/*.css', 'js/dist/*.js', 'js/min/*.js'],
			release: ['release']
		},

		sass: {
			options: {
				implementation: sass,
				sourceMap: true
			},
			styles: {
				files: {
					'css/styles.css': 'scss/styles.scss',
					'css/editor-styles.css': 'scss/editor-styles.scss'
				}
			}
		},

		postcss: {
			options: {
				map: {
					inline: false
				},
				processors: [autoprefixer()]
			},
			styles: {
				src: ['css/*.css']
			},
			build: {
				options: {
					map: false,
					processors: [autoprefixer(), cssnano()]
				},
				src: ['css/*.css']
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['js/src/**/*.js'],
				dest: 'js/dist/<%= pkg.themeSlug %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.themeName %> <%= grunt.template.today("yyyy-mm-dd") %> */\\n'
			},
			dist: {
				files: {
					'js/min/<%= pkg.themeSlug %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		watch: {
			styles: {
				files: ['scss/**/*.scss'],
				tasks: ['styles'],
				options: {
					interrupt: true
				}
			},
			scripts: {
				files: ['js/src/**/*.js'],
				tasks: ['scripts'],
				options: {
					interrupt: true
				}
			}
		},

		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/<%= pkg.themeSlug %>.<%= pkg.version %>.zip'
				},
				expand: true,
				src: [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.idea/**',
					'!js/src/**',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!composer.json',
					'!.gitignore'
				],
				dest: '<%= pkg.themeSlug %>/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('@lodder/grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');

	function hasScriptSources() {
		return grunt.file.expand(['js/src/**/*.js', '!js/src/**/.gitkeep']).length > 0;
	}

	grunt.registerTask('clean-assets', ['clean:assets']);
	grunt.registerTask('styles', ['sass:styles', 'postcss:styles']);
	grunt.registerTask('styles:build', ['sass:styles', 'postcss:build']);
	grunt.registerTask('scripts', function () {
		if (!hasScriptSources()) {
			grunt.log.ok('No JS source files found in js/src. Skipping scripts task.');
			return;
		}

		grunt.task.run(['concat', 'uglify']);
	});
	grunt.registerTask('lint', function () {
		const done = this.async();

		stylelint
			.lint({
				files: ['scss/**/*.scss'],
				configFile: '.stylelintrc.json',
				formatter: 'string'
			})
			.then(function (result) {
				const report = result.report || result.output;
				if (report) {
					grunt.log.writeln(report);
				}

				done(!result.errored);
			})
			.catch(function (error) {
				grunt.log.error(error);
				done(false);
			});
	});

	grunt.registerTask('build', ['clean:assets', 'styles:build', 'scripts', 'lint']);
	grunt.registerTask('dev', ['clean:assets', 'styles', 'scripts', 'watch']);
	grunt.registerTask('package', ['build', 'clean:release', 'compress']);
	grunt.registerTask('default', ['build']);
};
