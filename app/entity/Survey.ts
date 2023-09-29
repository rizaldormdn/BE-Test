export class Survey {
  private _id: number | undefined;
  private _value: number[];
  private _userId: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    value: number[],
    userId: number,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = id;
    this._value = value;
    this._userId = userId;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get value(): number[] {
    return this._value;
  }

  public get userId(): number {
    return this._userId;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public updated(): void {
    this._updatedAt = new Date();
  }
}
export type Surveys = Survey[];
