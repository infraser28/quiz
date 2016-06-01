var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Postgres DATABASE_URL = postgres://axymlwwcznwmiz:-bsCjNaU-m1CB1NUBOc3GKjtRK@ec2-23-21-193-140.compute-1.amazonaws.com:5432/dbku3om732u7gq
// SQLite   DATABASE_URL = sqlite:///
//          DATABASE_STORAGE = quiz.sqlite
var url, storage;

if(!process.env.DATABASE_URL) {
  url = "sqlite:///";
  storage = "quiz.sqlite";
} else {
  url = process.env.DATABASE_URL;
  storage = process.env.DATABASE_STORAGE || "";
}


// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(url,
                              { storage: storage,
                                omitNull: true
                              });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var Comment = sequelize.import(path.join(__dirname,'comment'));

// Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

// Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});


exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment;
exports.User = User;