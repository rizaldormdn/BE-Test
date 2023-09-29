export default class AttackSnapshot {
  private _sourceCountry: string;
  private _destinationCountry: string;
  private _type: string;

  constructor(sourceCountry: string, destinationCountry: string, type: string) {
    this._sourceCountry = sourceCountry;
    this._destinationCountry = destinationCountry;
    this._type = type;
  }

  public get sourceCountry(): string {
    return this._sourceCountry;
  }

  public get destinationCountry(): string {
    return this._destinationCountry;
  }

  public get type(): string {
    return this._type;
  }
}
export type AttackSnapshots = AttackSnapshot[];
