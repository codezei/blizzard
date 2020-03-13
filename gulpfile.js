var gulp         = require('gulp'), // Подключаем Gulp
	scss         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
   
//-------------------------------------------SCSS----------------------------------------------

gulp.task('scss', function() { // Создаем таск scss
	return gulp.src('www/scss/style.scss') // Берем источник
		.pipe(scss()) // Преобразуем scss в CSS посредством gulp-scss
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('www/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

//-------------------------------------------JS----------------------------------------------

gulp.task('scriptrel', function() {
	return gulp.src('www/js/**/*.js')
		.pipe(browserSync.reload({ stream: true }))
});

//-------------------------------------------BROWSER----------------------------------------------

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'www' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('code', function() {
	return gulp.src('www/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('watch', function() {
	gulp.watch('www/scss/**/*.scss', gulp.parallel('scss')); // Наблюдение за scss файлами
	gulp.watch('www/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('www/js/**/*.js', gulp.parallel('scriptrel')); // Наблюдение за главным JS файлом и за библиотеками
});

//-------------------------------------------all command----------------------------------------------

gulp.task('default', gulp.parallel('scss', 'scriptrel', 'browser-sync', 'watch'));






