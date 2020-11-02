"use strict";

/**
 * Game Declarations
 */
var Game = Game || {};
var Keyboard = Keyboard || {};
var Component = Component || {};

/**
 * Keyboard Snake
 */
Keyboard.Keymap = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

/**
 * Keyboard Events
 */
Keyboard.ControllerEvents = function () {
  // Conjuntos
  var self = this;
  this.pressKey = null;
  this.keymap = Keyboard.Keymap;

  // Keydown Event
  document.onkeydown = function (event) {
    self.pressKey = event.which;
  };

  // Obtener el Key
  this.getKey = function () {
    return this.keymap[this.pressKey];
  };
};

// Etapa de componentes del juego
Component.Stage = function (canvas, conf) {
  // Conjuntos
  this.keyEvent = new Keyboard.ControllerEvents();
  this.width = canvas.width;
  this.height = canvas.height;
  this.length = [];
  this.food = {};
  this.score = 0;
  this.direction = "right";
  this.conf = {
    cw: 10,
    size: 5,
    fps: 100,
  };

  // Fusionar Configuración
  if (typeof conf == "conf") {
    for (var key in conf) {
      if (conf.hasOwnProperty(key)) {
        this.conf[key] = conf[key];
      }
    }
  }
};

/**
 * Componente del Juego Snake
 */
Component.Snake = function (canvas, conf) {
  // Game Stage
  this.stage = new Component.Stage(canvas, conf);

  // Iniciar Snake
  this.initSnake = function () {
    // Iteración en Snake Conf Size
    for (var i = 0; i < this.stage.conf.size; i++) {
      // Añadir las celdas para el Snake
      this.stage.length.push({
        x: i,
        y: 0,
      });
    }
  };

  // Llamar a Snake
  this.initSnake();

  // Iniciar Food
  this.initFood = function () {
    // Añadir comida en el Stage
    this.stage.food = {
      x: Math.round(
        (Math.random() * (this.stage.width - this.stage.conf.cw)) /
          this.stage.conf.cw
      ),
      y: Math.round(
        (Math.random() * (this.stage.height - this.stage.conf.cw)) /
          this.stage.conf.cw
      ),
    };
  };
  // Llamar a Food
  this.initFood();

  // Reiniciar Stage
  this.restart = function () {
    this.stage.length = [];
    this.stage.food = {};
    this.stage.score = 0;
    this.direction = "right";
    this.stage.keyEvent.pressKey = null;
    this.initSnake();
    this.initFood();
  };
};

/**
 * Game Draw
 */
Game.Draw = function (context, snake) {
  this.drawStage = function () {
    // Comprobar la pulsación de teclas y establecer la dirección del Stage
    var keyPress = snake.stage.keyEvent.getKey();
    if (typeof keyPress != "undefined") {
      snake.stage.direction = keyPress;
    }

    // Dibujar el stage en blanco
    context.fillStyle = "white";
    context.fillRect(0, 0, snake.stage.width, snake.stage.height);

    // Snake Position
    var nx = snake.stage.length[0].x;
    var ny = snake.stage.length[0].y;

    //  Añade la posición por la dirección del escenario
    switch (snake.stage.direction) {
      case "right":
        nx++;
        break;
      case "left":
        nx--;
        break;
      case "up":
        ny--;
        break;
      case "down":
        ny++;
        break;
    }

    // Comprobar las Colisiones
    if (this.collision(nx, ny) == true) {
      snake.restart();
      return;
    }

    // Lógica de la comida Snake
    if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
      var tail = { x: nx, y: ny };
      snake.stage.score++;
      snake.initFood();
    } else {
      var tail = snake.stage.length.pop();
      tail.x = nx;
      tail.y = ny;
    }
    snake.stage.length.unshift(tail);

    // Dibujar Serpiente
    for (var i = 0; i < snake.stage.length.length; i++) {
      var cell = snake.stage.length[i];
      this.drawCell(cell.x, cell.y);
    }

    // Dibujar Comida
    this.drawCell(snake.stage.food.x, snake.stage.food.y);

    // Dibujar el Score
    context.fillText("Score: " + snake.stage.score, 5, snake.stage.height - 5);
  };

  // Draw Cell
  this.drawCell = function (x, y) {
    context.fillStyle = "rgb(170, 170, 170)";
    context.beginPath();
    context.arc(
      x * snake.stage.conf.cw + 6,
      y * snake.stage.conf.cw + 6,
      4,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
  };

  // Check Collision with walls
  this.collision = function (nx, ny) {
    if (
      nx == -1 ||
      nx == snake.stage.width / snake.stage.conf.cw ||
      ny == -1 ||
      ny == snake.stage.height / snake.stage.conf.cw
    ) {
      return true;
    }
    return false;
  };
};

/**
 * Game Snake
 */
Game.Snake = function (elementId, conf) {
  // Conjuntos
  var canvas = document.getElementById(elementId);
  var context = canvas.getContext("2d");
  var snake = new Component.Snake(canvas, conf);
  var gameDraw = new Game.Draw(context, snake);

  // Intervalos del Juego
  setInterval(function () {
    gameDraw.drawStage();
  }, snake.stage.conf.fps);
};

/**
 * Window Load
 */
window.onload = function () {
  var snake = new Game.Snake("stage", {
    fps: 100,
    size: 4,
  });
};
