import { Pool } from "pg";
import Attack from "../entity/Attack";
import { Survey, Surveys } from "../entity/Survey";
import AttackSnapshot, { AttackSnapshots } from "../entity/AttackSnapshot";

export default class Repository {
  private _pool: Pool;
  constructor(pool: Pool) {
    this._pool = pool;
  }

  private _updateDoSurvey(userId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._pool.query(
        `UPDATE users SET dosurvey = true WHERE id = ?`,
        [userId],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);
            reject(new Error("failed"));
          }
          resolve(result);
        }
      );
    });
  }

  public refactor2(survey: Survey): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._pool.query(
        `INSERT INTO surveys ("values", "createdAt", "updatedAt", "userId") VALUES ($1, $2, $3, $4)`,
        [survey.value, survey.createdAt, survey.updatedAt, survey.userId],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);
            reject(new Error("failed"));
          }
          this._updateDoSurvey(survey.userId);
          resolve(result);
        }
      );
    });
  }
  public survey(): Promise<Surveys> {
    return new Promise<Surveys>((resolve, reject) => {
      this._pool.query(
        `SELECT "id", "values", "createdAt", "updatedAt", "userId" FROM surveys`,
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);
            reject(new Error("failed get an survey"));
          }
          let survey: Surveys = [];
          if (result.rows.length > 0) {
            for (let entry of result.rows) {
              let data = new Survey(
                entry.values,
                entry.userId,
                entry.id,
                entry.createdAt,
                entry.updatedAt
              );
              survey.push(data);
            }
          }
          resolve(survey);
        }
      );
    });
  }

  public storeAttack(attack: Attack): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this._pool.query(
        `INSERT INTO attacks 
            (
              source_country, 
              destination_country, 
              millisecond, 
              type, 
              attack_time, 
              weight
            ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          attack.sourceCountry,
          attack.destinationCountry,
          attack.millisecond,
          attack.type,
          attack.attackTime,
          attack.weight,
        ],
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);
            reject(new Error("failed save an attack"));
          }
          resolve(result);
        }
      );
    });
  }
  
  public getDataAttack(): Promise<AttackSnapshots> {
    return new Promise<AttackSnapshots>((resolve, reject) => {
      this._pool.query(
        `
        SELECT
          source_country,
          destination_country,
          type
          COUNT(*) AS count
        FROM
          attacks
        GROUP BY
          source_country,
          destination_country,
          type
        ORDER BY
          source_country,
          destination_country,
          type`,
        (err: any | null, result: any) => {
          if (err) {
            console.error(err);
            reject(new Error("failed"));
          }
          const attackSnapshots: AttackSnapshots = [];
          if (result.length > 0) {
            for (let entry of result) {
              const attackSnapshot = new AttackSnapshot(
                entry.sourceCountry,
                entry.destinationCountry,
                entry.type
              );
              attackSnapshots.push(attackSnapshot);
            }
            resolve(attackSnapshots);
          }
        }
      );
    });
  }
}
