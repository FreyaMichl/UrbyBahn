//in this Scene we fuse all the Entities together
//it contains the aftertick, preload and draw functions used for our Urbybahn

import Scene from "../scene.js";
import Kirby from "../entity/kirby.js";
import Planet from "../entity/planet.js";
import Spaceship from "../entity/spaceship.js";
import Interior from "../entity/interior.js";
import Bridge from "../entity/interactionElements/bridge.js";
import Tomato from "../entity/interactionElements/tomato.js";
import Tree from "../entity/interactionElements/tree.js";
import Magnet from "../entity/interactionElements/magnet.js";
import Crystal from "../entity/interactionElements/crystal.js";
import Collision from "../entity/interactionElements/collision.js";
import Portal from "../entity/interactionElements/portal.js";
import Rotor from "../entity/interactionElements/rotor.js";
import environment from "../environment.js";

class SpaceScene extends Scene {

  //generate entities
  constructor() {
    super();
    this.tomato1 = new Tomato("assets/textures/interactionElements/tomato.png", 530, 2830);
    this.tomato2 = new Tomato("assets/textures/interactionElements/tomato.png", 750, 2855);
    this.trees = new Tree(1265, 3429, 33 * 3, 60 * 3)
    this.interior = new Interior();
    this.spaceshipLeft = new Spaceship("left", -415, 178);
    this.spaceshipRight = new Spaceship("right", 380, 110);
    this.portalAnimated = new Portal("assets/textures/interactionElements/portal.png", 890, 5200, true)
    this.portal = new Portal("assets/textures/interactionElements/portal.png", 890, 5200, false)
    this.kirby = new Kirby();
    this.planet1 = new Planet("assets/textures/interactionElements/planet.png", 1500, 600, 250);
    this.planet2 = new Planet("assets/textures/interactionElements/earth_planet.png", 250, 900, 200);
    this.magnet = new Magnet();
    this.crystal12Right = new Crystal("one_right", 5, 2110);
    this.crystal123Right = new Crystal("one_right", 240, 2110);
    this.crystal1Left = new Crystal("one_left", 0, 2110);
    this.crystal12Left = new Crystal("one_left", 300, 2110);
    this.crystal1Right = new Crystal("one_right", 60, 2110);
    this.crystal2Left = new Crystal("two_left", 120, 2110);
    this.crystal21Left = new Crystal("two_left", 380, 2110);
    this.crystal2Right = new Crystal("two_right", 180, 2110);
    this.crystal21Right = new Crystal("two_right", 130, 2090);
    this.rotor1 = new Rotor("assets/textures/interactionElements/motor_blade.png", 640, 4088, 0.07);
    this.rotor2 = new Rotor("assets/textures/interactionElements/motor_blade.png", 915, 3952, -0.07);
    this.rotor3 = new Rotor("assets/textures/interactionElements/motor_blade.png", 778, 4228, 0.07);
    this.rotor4 = new Rotor("assets/textures/interactionElements/motor_blade.png", 1053, 4228, -0.07);
    this.entryCollision = new Collision(600, 1630, 300, 20, -0.628319,
      () => this.kirby.sprite.body,
      () => {
        this.planet1.sprite.body.mass = 0.00000000000001
        this.planet2.sprite.body.mass = 0.00000000000001
        environment.engine.world.gravity.scale = 0.00016
        this.kirby.setJumpControl("right-down")
        this.kirby.sprite.body.friction = 0

      });
    this.magnetCollision = new Collision(1075 - 10 - 5 - 10, 2000, 550 - 20 - 10 - 20, 300, 0, () => this.kirby.sprite.body, () => {
      this.magnet.awaitKirby();
    })
    this.cafeteriaEnterCollision = new Collision(400, 2500, 150, 50, 0, () => this.kirby.sprite.body, () => {
      this.kirby.setJumpControl("right-down")
    })
    this.magnetStopCollision = new Collision(1390 + 15, 2000, 90, 300, 0, () => this.kirby.sprite.body, () => {
      this.magnet.dropKirby();
      this.kirby.setJumpControl("left-down")
    })
    this.treeCollision = new Collision(1410, 3400, 120, 100, 0, () => this.kirby.sprite.body, () => {
      this.kirby.setJumpControl("left-up")
    })
    this.bladeEntryCollision = new Collision(630, 3840, 120, 100, 0, () => this.kirby.sprite.body, () => {
      this.kirby.setJumpControl("center-up")
    })
    //add entities to the scene
    this.addEntity(this.planet1);
    this.addEntity(this.planet2);
    this.addEntity(this.spaceshipLeft);
    this.addEntity(this.spaceshipRight);
    this.addEntity(this.interior);
    this.addEntity(this.portal);
    this.addEntity(this.kirby);
    this.addEntity(this.portalAnimated);
    this.addEntity(this.tomato1);
    this.addEntity(this.tomato2);
    this.addEntity(this.trees);
    this.addEntity(this.magnet);
    this.addEntity(this.crystal21Right);
    this.addEntity(this.crystal12Right);
    this.addEntity(this.crystal123Right);
    this.addEntity(this.crystal1Left);
    this.addEntity(this.crystal12Left);
    this.addEntity(this.crystal1Right);
    this.addEntity(this.crystal2Left);
    this.addEntity(this.crystal21Left);
    this.addEntity(this.crystal2Right);
    this.addEntity(this.entryCollision);
    this.addEntity(this.magnetCollision);
    this.addEntity(this.magnetStopCollision);
    this.addEntity(this.cafeteriaEnterCollision);
    this.addEntity(this.treeCollision);
    this.addEntity(this.bladeEntryCollision);
    this.addEntity(this.rotor1);
    this.addEntity(this.rotor2);
    this.addEntity(this.rotor3);
    this.addEntity(this.rotor4);
    this.createBridge();
  }

  //generating the bridge with it's constraints and parts
  createBridge() {
    let parts = []
    for (let i = 0; i < 20; i++) {
      parts[i] = new Bridge("assets/textures/interactionElements/bridge_wood.png", 540 + i * 23, 2130, () => {
        let done = true;
        for (let j = 0; j < parts.length; j++) {
          if (j === i) continue
          if (!parts[j].initialized) {
            done = false
            break
          }
        }
        parts[i].initialized = true
        if (done) {
          for (let j = 0; j < parts.length - 1; j++) {
            let bodyA = parts[j].sprite.body;
            let bodyB = parts[j + 1].sprite.body;
            //constraints between the parts of the bridge
            Matter.World.add(environment.engine.world, Matter.Constraint.create({
              bodyA: bodyA,
              pointA: {
                x: 10.5,
                y: 0
              },
              bodyB: bodyB,
              pointB: {
                x: -10.5,
                y: 0
              },
              restitution: 0,
              stiffness: 0.5,
              damping: 1,
              length: 2
            }))
          }

          //the first constraint
          Matter.World.add(environment.engine.world, Matter.Constraint.create({
            bodyB: parts[0].sprite.body,
            pointA: {
              x: 320,
              y: 2230,
              length: 100,
              stiffness: 0.4,
              restitution: 1,
              damping: 0
            },
            pointB: {
              x: -10.5,
              y: 0
            },
            stiffness: 1,
            length: 2
          }))
          //the last constraint
          Matter.World.add(environment.engine.world, Matter.Constraint.create({
            bodyB: parts[parts.length - 1].sprite.body,
            pointA: {
              x: 800,
              y: 2130,
              length: 100,
              stiffness: 1
            },
            pointB: {
              x: 10.5,
              y: 0
            },
            stiffness: 1,
            length: 2
          }))
        }
      });
    }

    parts.forEach(bridge => this.addEntity(bridge))

    return {
      parts: parts
    }
  }

  afterTick() {
    super.afterTick();
    let sprite = this.kirby.sprite;
    if (!sprite) return;
    let body = sprite.body;
    if (!body) return;
    let page = Math.floor((body.position.y - 300 + windowHeight) / windowHeight);
    if (keyIsDown(32)) {
      if (Matter.SAT.collides(this.planet1.sprite.body, body).collided) {
        Body.applyForce(body, body.position, Vector.mult(Vector.normalise(Vector.sub(Vector.add(this.planet2.sprite.body.position, Vector.create(0, -100)), body.position)), 0.01))
      }
      if (Matter.SAT.collides(this.planet2.sprite.body, body).collided) {
        Body.applyForce(body, body.position, Vector.mult(Vector.normalise(Vector.sub(Vector.add(this.spaceshipLeft.sprite.body.position, Vector.create(300, 0)), body.position)), 0.02))
      }
    }
    if (body.velocity.y < 0) {
      this.entryCollision.sprite.body.collisionFilter.category = 1
    } else {
      this.entryCollision.sprite.body.collisionFilter.category = 0
    }
    environment.scrollToPage(page);

  }


  preload() {
    getAudioContext().resume()
    this.background = loadImage("assets/textures/background.png",
      result => {
        this.background.resize(this.background.width, this.background.height);
      });
    this.tapSpace = loadImage("assets/textures/TapSpace.png");
    this.actualOutline = loadImage("assets/textures/spaceship/spaceship_outline-2.png")

    this.entities.forEach(entity => entity.preload())

    this.music = loadSound("assets/audio/background-music.m4a", result => {
      result.playMode("restart");
      result.setVolume(0.3);
      result.play();
    });
  }

  //draw the scene
  draw() {
    environment.canvas.getTexture(this.background).setInterpolation(NEAREST, NEAREST)
    environment.canvas.getTexture(this.actualOutline).setInterpolation(NEAREST, NEAREST)

    image(this.background, 0, 0);
    image(this.tapSpace, (windowWidth - this.tapSpace.width) / 2, 300);
    translate(0, -300 + windowHeight);

    if (this.spaceshipLeft.sprite && this.spaceshipLeft.sprite.body) {
      let width = 648 * 2;
      let height = 1841 * 2;
      image(this.actualOutline, this.spaceshipLeft.sprite.body.position.x - width / 2 + 423, this.spaceshipLeft.sprite.body.position.y - height / 2 - 165, width, height)
    }

    //draw all entities
    super.draw()
    this.entities.forEach(entity => {
      tint(255, 255);
      entity.draw()
    });
  }


}


export default new SpaceScene()