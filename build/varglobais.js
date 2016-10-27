/*===========================================================================================================
#   2ª Entrega  -  28/10
#
#   Calculo de velocidade é so num objeto:
#   Superclase "movable" tem velocidade, aceleraçao, funcao move, funcao detectColision.
#   Nave, aliens, tiro derivam dessa classe
#
#   Colisão detetada por esfera
#
#
#
============================================================================================================*/

var currentCamera, ortographicCamera, perspectiveCamera1, perspectiveCamera2;
var scene, renderer;
var geometry, mesh;
var ship, bullet;
var t;

var materialSKiller, materialShip, materialBullet;

var aspectRatio, viewSize;

var width = 1000;
var height = 600;

var sKillerWidth = 5;
var sKillerHeight = 5;
var sKillerDepth = 5;

var shipWidth = 5;
var shipHeight = 5;
var shipDepth = 5;

var bulletWidth = 5;
var bulletHeight = 5;
var bulletDepth = 5;

const PI = Math.PI;
