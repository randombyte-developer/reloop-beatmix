import { MidiControl, MidiControlCallback } from "./midiControl";

export class FineMidiControl extends MidiControl {
  readonly nameMsb: string;
  readonly nameLsb: string;

  private lastValueMsb: number = 0;
  private lastValueLsb: number = 0;

  constructor(readonly name: string, callback: MidiControlCallback) {
    super(name, true, callback); // scaled parameter doesn't matter here, because this overrides the offerValue function anyway

    this.nameMsb = name + "Msb";
    this.nameLsb = name + "Lsb";
  }

  public offerValue(name: string, value: number) {
    if (name === this.nameMsb) {
      // tslint:disable-next-line: no-bitwise
      this.lastValue = ((value << 7) + this.lastValueLsb) / 0x3fff;
      this.lastValueMsb = value;
    } else if (name === this.nameLsb) {
      // tslint:disable-next-line: no-bitwise
      this.lastValue = ((this.lastValueMsb << 7) + value) / 0x3fff;
      this.lastValueLsb = value;
    } else {
      return;
    }

    if (this.callback.onNewValue) this.callback.onNewValue(this.lastValue);

    // onValueChanged is always called, even if the value didn't actually got changed from the previous call
    if (this.callback.onValueChanged)
      this.callback.onValueChanged(this.lastValue);
  }
}
