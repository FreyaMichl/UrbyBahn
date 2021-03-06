import Entity from "../entity.js";
import Sprite from "../sprite.js";
import environment from "../environment.js";

export default class Interior extends Entity {

  createSprite() {
    let sprite = new class extends Sprite {

      createBody(animation) {
        let body = super.createBody(animation);
        Body.setPosition(body, Vector.create(880, 3010));
        return body;
      }
    }(loadJSON("assets/sprites/spaceship_whole_interior.json"), {
      isStatic: true,
      mass: 0.01
    });
    sprite.setAnimation("idle")
    return sprite;
  }

  preload() {
    super.preload();
    this.actualOutline = loadImage("assets/textures/interiorSpaceship/whole_interior.png")
  }


  afterTick() {
    super.afterTick();
    if (!this.sprite || !this.sprite.body) return
    if (environment.scene.kirby.sprite && environment.scene.kirby.sprite.body && environment.scene.kirby.sprite.body.position.y > 4426) {
      this.sprite.body.collisionFilter.category = 0
    } else {
      this.sprite.body.collisionFilter.category = 1
    }
  }

  draw() {
    environment.canvas.getTexture(this.actualOutline).setInterpolation(NEAREST, NEAREST)

    super.draw();
    if (this.sprite.body) {
      let width = this.sprite.body.bounds.max.x - this.sprite.body.bounds.min.x + 100;
      let height = this.sprite.body.bounds.max.y - this.sprite.body.bounds.min.y + 700;
      image(
        this.actualOutline,
        this.sprite.body.position.x - width / 2 + 25,
        this.sprite.body.position.y - height / 2 + 202,
        width,
        height)
    }
  }

}