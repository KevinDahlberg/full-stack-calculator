module.exports=function(grunt){
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      browserSync: {
        dev: {
          bsFiles: {
              src : ['server/public/styles/*.css','server/public/scripts/*.js','server/public/views/*.html']
          },
          options: {
                proxy: "localhost:4000"
              }
          }
      }

    });


grunt.loadNpmTasks('grunt-browser-sync');

grunt.registerTask('default', ['browserSync']);

};
