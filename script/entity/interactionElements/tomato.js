import Entity from "../../entity.js";
import {
  SimpleSprite
} from "../../sprite.js";

class TomatoSprite extends SimpleSprite {
  constructor(texture, x, y) {
    super(texture)
    this.x = x
    this.y = y
  }
  createBody() {
    let body = Bodies.rectangle(
      this.x,
      this.y,
      24,
      20, {
        isStatic: true,
        mass: 0.1,
        restitution: 0.7,
      });
    return body;
  }
  draw() {
    super.draw();
  }
}

export default class Tomato extends Entity {

  constructor(texture, x, y) {
    super();
    this.texture = texture;
    this.x = x;
    this.y = y;
  }

  createSprite() {
    return new TomatoSprite(this.texture, this.x, this.y);
  }


  afterTick() {

  }
}