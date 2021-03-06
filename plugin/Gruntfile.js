module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [ "src/jquery.datacube.js" ],
				dest: "dist/libs/jquery.datacube.js"
			}
		},

		// Lint definitions
		jshint: {
			files: [ "src/jquery.datacube.js", "test/**/*" ],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		jscs: {
			src: "src/**/*.js",
			options: {
				config: ".jscsrc"
			}
		},
/* 
		// Minify definitions (with basket.js)
		uglify: {
			dist: {
			src: [ "src/vendor/jquery-3.3.1.js", "src/vendor/rsvp.js", "src/vendor/basket.js", "src/jquery.datacube.js" ],
				dest: "dist/libs/cubeExplorer.full.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		}, */

		
		// Minify definitions
		uglify: {
			dist: {
			src: [ "src/vendor/jquery-3.3.1.js", "src/jquery.datacube.js" ],
				dest: "dist/libs/cubeExplorer.full.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"dist/jquery.datacube.js": "src/jquery.boilerplate.coffee"
				}
			}
		},

		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: true,
				singleRun: false,
				browsers: [ "PhantomJS", "Firefox" ]
			},

			//continuous integration mode: run tests once in PhantomJS browser.
			travis: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: [ "PhantomJS" ]
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: [ "src/*", "test/**/*" ],
			tasks: [ "default" ]
		},

		copy: {
			main: {
				expand : true,
				cwd: '../dist/',
				src: '**',
				dest: 'dist/',
			  }
		  },
		clean: ['dist/', 'documentation_plugin/'],
		esdoc : {
			dist : {
				options: {
					config: 'esdoc.json'
				}
			}
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-jscs" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-coffee" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-karma" );
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-esdoc');

	grunt.registerTask( "travis", [ "jshint", "karma:travis" ] );
	grunt.registerTask( "lint", [ "jshint", "jscs" ] );
	grunt.registerTask( "build", [ "clean", "copy", "concat", "uglify", "esdoc" ] );
	grunt.registerTask( "default", [ "jshint", "build", "karma:unit:run" ] );
};
