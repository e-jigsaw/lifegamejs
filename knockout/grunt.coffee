# grut config
module.exports = (grunt)->
	grunt.initConfig
		pkg: "<json:package.json>"
		coffee:
			self:
				files:
					"grunt.js": ["grunt.coffee"]
				options:
					bare: true
			app:
				files:
					"js/lifegame.js": ["js/lifegame.coffee"]
				options:
					bare: true
		jade:
			index:
				options:
					data:
						debug: false
						pretty: true
				files:
					"index.html": ["index.jade"]
		less:
			style:
				options:
					yuicompress: true
				files:
					"css/style.css": "css/style.less"

		watch:
			files: ["*.coffee", "*.jade", "css/*.less", "js/*.coffee"]
			tasks: "coffee jade less"

		grunt.loadNpmTasks "grunt-coffee"
		grunt.loadNpmTasks "grunt-contrib"

		grunt.registerTask "default", "watch"