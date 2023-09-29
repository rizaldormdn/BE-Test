import { Pool } from "pg";

export default class UserRepository {
  private _pool: Pool;
  constructor(pool: Pool) {
    this._pool = pool;
  }
  public login(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._pool.query(``);
    });
  }
  public register(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._pool.query(`INSERT INTO users`);
    });
  }
}
