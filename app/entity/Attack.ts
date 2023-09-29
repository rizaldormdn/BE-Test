export default class Attack {
  private _sourceCountry: string;
  private _destinationCountry: string;
  private _millisecond: number;
  private _type: string;
  private _weight: number;
  private _attackTime: Date;

  constructor(
    sourceCountry: string,
    destinationCountry: string,
    millisecond: number,
    type: string,
    weight: number,
    attackTime: Date
  ) {
    this._sourceCountry = sourceCountry;
    this._destinationCountry = destinationCountry;
    this._millisecond = millisecond;
    this._type = type;
    this._weight = weight;
    this._attackTime = attackTime;
  }

  public get sourceCountry(): string {
    return this._sourceCountry;
  }

  public get destinationCountry(): string {
    return this._destinationCountry;
  }

  public get millisecond(): number {
    return this._millisecond;
  }

  public get type(): string {
    return this._type;
  }

  public get weight(): number {
    return this._weight;
  }

  public get attackTime(): Date {
    return this._attackTime;
  }
}
export type Attacks = Attack[];
