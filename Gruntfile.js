module.exports = function(grunt) {

  var destinationFolder = './dist';

  grunt.initConfig({

    nodewebkit: {
       options: {
       	build_dir: './webkitbuilds',
      	 mac: true,
       },
       src: ['src/**']

    },

    less: {
      production: {
        options: {
          paths: ["src/css"]

        },
        files: {
          "src/css/application.css": "src/css/application.less"
        }
      }
    },

    coffee: {
      glob_to_multiple: {
        expand: true,
        flattein: true,
        cwd: "src/coffee/",
        src: '*.coffee',
        dest: 'src/js/',
        ext: '.js'
      },
    },
    
    shell: {
      start_webkit: {
        command: 'open webkitbuilds/releases/boscoui/mac/BoscoUI.app'
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['coffee', 'less', 'nodewebkit']);
  grunt.registerTask('run', ['coffee', 'less', 'nodewebkit', 'shell:start_webkit'])


};
