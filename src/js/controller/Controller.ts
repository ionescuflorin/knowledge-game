import { Game } from "../model/Game";
import { View } from "../view/View";

/**
 * Main controller in the game what control all mouse and buttons event
 * @public
 */
export class Controller {
  /** main game model and view */
  protected _game: Game;
  protected _view: View;

  /**
   * Init controller with model and view
   * @param game main game model
   * @param view main view
   */
  constructor(game: Game, view: View) {
    this._game = game;
    this._view = view;
    this._addListeners();
  }

  /** init all event listeners in the game */
  private _addListeners(): void {
    const buttonGravityInc = document.querySelector(
      ".gravity-value-controls button.inc"
    );
    const buttonGravityDec = document.querySelector(
      ".gravity-value-controls button.dec"
    );

    buttonGravityInc?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.incGravity();
    });
    buttonGravityDec?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.decGravity();
    });

    const buttonShapeSpawnSpeedInc = document.querySelector(
      ".shape-spawn-speed-controls button.inc"
    );
    const buttonShapeSpawnSpeedDec = document.querySelector(
      ".shape-spawn-speed-controls button.dec"
    );

    buttonShapeSpawnSpeedInc?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.incShapesSpawningSpeed();
    });
    buttonShapeSpawnSpeedDec?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.decShapesSpawningSpeed();
    });
  }
}
