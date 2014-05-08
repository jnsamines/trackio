// Gruntfile.js
// Archivo de configuracion de tareas expuestas por grunt
// Author : Jonathan Samines [jnsamines]

module.exports = function(grunt){
    
    // se configuran las tareas
    grunt.initConfig({
        dirs : {
            css : './public/assets/stylesheet/'
        },
        concat : {
            css : {
                src : [
                    '<%= dirs.css %>/layout.css',
                    '<%= dirs.css %>/components/helpers.css',
                    '<%= dirs.css %>/components/buttons.css',
                    '<%= dirs.css %>/components/header.css',
                    '<%= dirs.css %>/components/input.css',
                    '<%= dirs.css %>/components/tables.css',
                    '<%= dirs.css %>/components/toolbar.css'
                ] ,
                dest : './public/assets/stylesheet/trackio.css'
            }
        },
        
        watch : {
            files : ['./public/assets/stylesheet/*'],
            tasks : ['concat:css']
        }
    });
    
    // se cargan las tareas
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['concat', 'watch']);
    
};