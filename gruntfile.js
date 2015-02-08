module.exports = function(grunt) {

	grunt.registerTask('watch', [ 'watch' ]);
	grunt.registerTask('build', [ 'clean:pre', 'mkdir:build', 'html2str:overlay', 'rename:html', 'less', 'cssmin', 'CSStoJS:files', 'uglify:dist', 'concat:js', 'clean:post' ]);
	grunt.registerTask('server', [ 'connect:server', 'watch' ]);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mkdir: {
			build: {
				options: {
					mode: 0777,
					create: ['build']
				}
			}
		},
		jshint: {
			options: {
				globals: {
					jQuery: true
				}
			},
			js: {
				src: ['src/*.js']
			}
		},
		concat: {
			options: {
				separator: ';\n'
			},
			js: {
				src: [
					'build/jquery.projectblocker.js',
					'build/jquery.projectblocker.html.js',
					'build/jquery.projectblocker.css.js'
				],
				dest: 'dist/jquery.projectblocker.min.js'
			}
		},
		uglify: {
			options: {
				mangle: {
					except: [ 'jQuery', 'pbOverlayDOM', 'pbStyles', 'projectBlocker' ]
				},
				compress: {
					unused: false
				},
				preserveComments: 'some',
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - http://github.com/mike-zarandona/ProjectBlocker */\n'
			},
			dist: {
				src: [ 'src/jquery.projectblocker.js' ],
				dest: 'build/jquery.projectblocker.js'
			}
		},
		html2str: {
			overlay: {
				options: {
					prefix: 'var pbOverlayDOM=',
					suffix: ';',
					src: 'html/jquery.projectblocker.html',
					dest: 'build'
				}
			}
		},
		rename: {
			html: {
				files: {
					'build/jquery.projectblocker.html.js': [ 'build/jquery.projectblocker.js' ]
				}
			}
		},
		less: {
			style: {
				files: {
					"build/jquery.projectblocker-styles.css": "less/jquery.projectblocker.less"
				}
			}
		},
		cssmin: {
			target: {
				src: 'build/jquery.projectblocker-styles.css',
				dest: 'build/jquery.projectblocker-styles.min.css'
			}
		},
		CSStoJS: {
			options: {
				varName: 'pbStyles'
			},
			files: {
				src: 'build/jquery.projectblocker-styles.min.css',
				dest: 'build/jquery.projectblocker.css.js'
			}
		},
		clean: {
			pre: [ 'dist/jquery.projectblocker.min.js' ],
			post: [ 'build' ]
		},
		connect: {
			server: {
				options: {
					port: 9002,
					hostname: 'localhost'
				}
			}
		},

		watch: {
			js: {
				files: [ 'src/*.js' ],
				tasks: [ 'jshint:js', 'clean:pre', 'mkdir:build', 'html2str:overlay', 'rename:html', 'less', 'cssmin', 'CSStoJS:files', 'uglify:dist', 'concat:js', 'clean:post' ],
				options: {
					livereload: true
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-html2str');
	grunt.loadNpmTasks('grunt-csstojs');
	grunt.loadNpmTasks('grunt-mkdir');
};
