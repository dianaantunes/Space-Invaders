/*===========================================================================================================
#
#
#   2ª Entrega  -  28/10
#
#
============================================================================================================*/

var currentCamera, ortographicCamera, perspectiveCamera1, perspectiveCamera2;
var scene, renderer;
var geometry, mesh;
var ship, bullet;
var t;

var pointLight;

var materialSKiller, materialShip, materialBullet, materialStar;
var sceneMesh;
var lastShot = new Date().getTime();
var shooting = 0;

var aspectRatio, viewSize = 900;

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
const MINBULLETTIME = 300;
