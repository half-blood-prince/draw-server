import { request } from "express";
import GameScreen from "./GameScreen";
import UserScore from "./UserScore";
import SimpleUserRecord from "./SimpleUserRecord";

class GameScreenStatePayload {
  public gameScreenState: GameScreen;
  public screenData: string;

  static create(gameScreenState: GameScreen, screenData: string): GameScreenStatePayload {
    return new GameScreenStatePayload(gameScreenState, screenData);
  }

  static createWaitForDrawingWord(simpleUserRecord: SimpleUserRecord): GameScreenStatePayload {
    return new GameScreenStatePayload(GameScreen.State.WAIT_FOR_DRAWING_WORD, simpleUserRecord.toJson());
  }

  static createSelectDrawingWord(): GameScreenStatePayload {
    return new GameScreenStatePayload(GameScreen.State.SELECT_DRAWING_WORD, "");
  }

  static createLeaderBoard(payload: Array<UserScore>): GameScreenStatePayload {
    return new GameScreenStatePayload(GameScreen.State.LEADER_BOARD, JSON.stringify(payload));
  }

  constructor(gameScreenState: GameScreen, screenData: string) {
    this.gameScreenState = gameScreenState;
    this.screenData = screenData;
  }

  toJson(): string {
    return JSON.stringify(this);
  }
}

export default GameScreenStatePayload;