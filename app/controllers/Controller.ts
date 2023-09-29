import axios from "axios";
import { Request, Response, Router } from "express";
import Attack from "../entity/Attack";
import { Survey, Surveys } from "../entity/Survey";
import Repository from "../repository/Repository";

export default class Controller {
  public static router(repository: Repository): Router {
    const router: Router = Router();

    router.get("/survey", async (req: Request, res: Response) => {
      try {
        const survey: Surveys = await repository.survey();

        const surveyValue: number[][] = survey.map((entry) =>
          entry.value.map((value) => (value !== null ? value : 0))
        );
        const averageValue: number[] = Array.from(
          { length: surveyValue.length },
          (_, i) => {
            const index = surveyValue.map((entry) => entry[i]);
            const total = index.reduce((acc, val) => acc + val, 0);
            return total / surveyValue.length;
          }
        );

        return res
          .status(200)
          .json({
            success: true,
            statuscode: 200,
            data: averageValue,
          })
          .end();
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({
            success: false,
            statuscode: 500,
          })
          .end();
      }
    });

    router.post("/survey", async (req: Request, res: Response) => {
      try {
        let values: number[] = req.body.values;
        let userId = req.body.userId;

        let survey: Survey = new Survey(values, userId);
        await repository.refactor2(survey);
        return res
          .status(201)
          .json({
            success: true,
            statuscode: 201,
            data: survey,
          })
          .end();
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({
            success: false,
            statuscode: 500,
            error: error,
          })
          .end();
      }
    });

    router.get("/attack", async (req: Request, res: Response) => {
      try {
        const response = await axios.get(
          "https://livethreatmap.radware.com/api/map/attacks?limit=10"
        );
        const responseData = response.data;
        for (let array of responseData) {
          for (let entry of array) {
            const attack: Attack = new Attack(
              entry.sourceCountry,
              entry.destinationCountry,
              entry.millisecond,
              entry.type,
              entry.weight,
              entry.attackTime
            );
            await repository.storeAttack(attack);
          }
        }
        return res
          .status(201)
          .json({
            success: true,
            statuscode: 201,
          })
          .end();
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({
            success: false,
            statuscode: 500,
            error: error,
          })
          .end();
      }
    });

    router.get("/attack-list", async (req: Request, res: Response) => {
      try {
        const attackSnapshot = await repository.getDataAttack();

        return res
          .status(201)
          .json({
            success: true,
            statuscode: 201,
            data: attackSnapshot,
          })
          .end();
      } catch (error) {
        console.error(error);

        res
          .status(500)
          .json({
            success: false,
            statuscode: 500,
            error: error,
          })
          .end();
      }
    });
    return router;
  }
}
