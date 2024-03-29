import { Button, ButtonCallback } from "./button";

export class DeckButton extends Button {
  constructor(deckIndex: number, name: string, callback: ButtonCallback) {
    super(deckIndex + name, callback);
  }
}
