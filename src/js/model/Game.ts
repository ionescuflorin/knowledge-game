import { Utils } from "../Utils";
import { Shape } from "./Shape";
import cfg from "../config";
import { Observer } from "../Observer";
import { Point } from "pixi.js";
import { gsap } from "gsap";

/**
 * Main game model what represent all game logic
 * @public
 */
export class Game {
  /**
   * Signals
   * @readonly
   * @public
   */
  public readonly shapesCountChange = new Observer<[number]>();
  public readonly shapesAreaChange = new Observer<[number]>();
  public readonly shapesPerSecChange = new Observer<[number]>();
  public readonly gravityForceChange = new Observer<[number]>();
  public readonly instantiateShape = new Observer<[Shape]>();

  /** all shapes in view square what was created */
  private _shapes: Shape[] = [];

  /** init main game */
  constructor() {
    this.startGame();
  }

  /** start game */
  public startGame(): void {
    this._delayShapeSpawning();

    // notify observers with init values
    this._calcShapesArea();
    this._calcShapesCount();
  }

  /** delay shape spawning. Delay takes from config in ms */
  private _delayShapeSpawning(): void {
    gsap.delayedCall(
      cfg.shapes.spawnDelay / 1000,
      this._spawnShapes.bind(this)
    );
  }

  /** spawn all shapes in the step */
  private _spawnShapes(): void {
    for (let i = 0; i < cfg.shapes.spawnPerSecond; i++) {
      this.createShape();
    }

    this._delayShapeSpawning();
  }

  /** calculate number of created shapes */
  private _calcShapesCount(): void {
    this.shapesCountChange.emit(this._shapes.length);
  }

  /** calculate the surface area (in px^2) occupied by the shape */
  private _calcShapesArea(): void {
    let area = this._shapes.reduce((prev, current) => {
      return prev + current.area;
    }, 0);

    this.shapesAreaChange.emit(area);
  }

  /** increase shape spawning speed */
  public incShapesSpawningSpeed(): void {
    this.shapesPerSecChange.emit(++cfg.shapes.spawnPerSecond);
  }

  /** decrease shape spawning speed */
  public decShapesSpawningSpeed(): void {
    this.shapesPerSecChange.emit(
      cfg.shapes.spawnPerSecond > 0 ? --cfg.shapes.spawnPerSecond : 0
    );
  }

  /** increase gravity force */
  public incGravity(): void {
    this.gravityForceChange.emit(++cfg.gravityForce);
  }

  /** decrease gravity force */
  public decGravity(): void {
    this.gravityForceChange.emit(cfg.gravityForce > 0 ? --cfg.gravityForce : 0);
  }

  /**
   * Create a primitive shape in position if available otherwise generate position randomly at the top outside view window
   * @param position where to create shape
   */
  public createShape(position?: Point): void {
    const shapeRadius = cfg.shapes.radius;
    // generate random position if it unavailable
    if (!position) {
      position = new Point(
        Utils.getRandomInRange(
          shapeRadius,
          cfg.windowSize.width - shapeRadius * 2
        ),
        -shapeRadius
      );
    }

    // init new shape
    const shape = new Shape(position, shapeRadius);
    this._shapes.push(shape);

    // notify observers with new data
    this.instantiateShape.emit(shape);
    this._calcShapesArea();
    this._calcShapesCount();
  }

  /**
   * remove primitive shape
   * @param shape shape what will be deleted
   */
  public removeShape(shape: Shape): void {
    shape.destroy();
    this._shapes.splice(this._shapes.indexOf(shape), 1);

    // notify observers with new data
    this._calcShapesArea();
    this._calcShapesCount();
  }
}
