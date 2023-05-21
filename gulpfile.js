const gulp = require('gulp');
const { exec } = require('child_process');

// Tarea para ejecutar el comando de Sass con la opción de observar cambios
gulp.task('sass', function (done) {
  exec('sass --watch ./Static/scss/_Style.scss:./Static/css/style.css', function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(error);
  });
});
