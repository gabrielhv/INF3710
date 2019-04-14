import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Animal} from '../../../common/tables/Animal';
import {Treatment} from '../../../common/tables/Treatment';

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/tables/:tableName",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.get("/animals",
                   (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAnimals()
                .then((result: pg.QueryResult) => {
                    const animals: Animal[] = result.rows.map((a: Animal) => (
                    {
                    animalid : a.animalid,
                    animalname: a.animalname,
                    animaltype: a.animaltype,
                    description: a.description,
                    inscriptiondate: a.inscriptiondate,
                    animalstate: a.animalstate,
                    ownerid: a.ownerid
                    }));
                    res.json(animals);
                    }).catch((e: Error) => {
                    console.error(e.stack);
                });
        });

        router.post("/animal/insert",
// tslint:disable-next-line: max-func-body-length
                    (req: Request, res: Response, next: NextFunction) => {
                const animalid: string = req.body.animalid;
                const animalname: string = req.body.animalname;
                const animaltype: string = req.body.animaltype;
                const description: string = req.body.description;
                const inscriptiondate: string = req.body.inscriptiondate;
                const animalstate: string = req.body.animalstate;
                const ownerid: string = req.body.ownerid;
// tslint:disable-next-line: max-line-length
                this.databaseService.createAnimal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
});

        router.delete("/animal/delete",
                      // tslint:disable-next-line:max-func-body-length
                      (req: Request, res: Response, next: NextFunction) => {
    const animalid: string = req.query.animalid;
    const ownerid: string = req.query.ownerid;
// tslint:disable-next-line: max-line-length
// delete the animal THEN queries all the remaining animals for subscribe
    // this.databaseService.deleteAnimal(animalid, ownerid).then(() => { res.json(); }).catch();
    this.databaseService.deleteAnimal(animalid, ownerid).then();
    this.databaseService.getAnimals().then((result: pg.QueryResult) => {
        const animals: Animal[] = result.rows.map((a: any) => (
        {
            animalid : a.animalid,
            animalname: a.animalname,
            animaltype: a.animaltype,
            description: a.description,
            inscriptiondate: a.inscriptiondate,
            animalstate: a.animalstate,
            ownerid: a.ownerid
        }));
        res.json(animals);
    }).catch((e: Error) => {
    console.error(e.stack);
    res.json(-1);
        });
    });

        router.post("/animal/update",
                    (req: Request, res: Response, next: NextFunction) => {

            const animalid: string = req.body.animalid;
            const animalname: string = req.body.animalname;
            const animaltype: string = req.body.animaltype;
            const description: string = req.body.description;
            const inscriptiondate: string = req.body.inscriptiondate;
            const animalstate: string = req.body.animalstate;
            const ownerid: string = req.body.ownerid;
            this.databaseService.updateAnimal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid);

            this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                const animals: Animal[] = result.rows.map((a: any) => ({
                    animalid : a.animalid,
                    animalname: a.animalname,
                    animaltype: a.animaltype,
                    description: a.description,
                    inscriptiondate: a.inscriptiondate,
                    animalstate: a.animalstate,
                    ownerid: a.ownerid
                }));
                res.json(animals);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.get("/owners",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getOwnersID().then((result: pg.QueryResult) => {
                        const ownersID: string[] = result.rows.map((row: any) => row.ownerid);
                        res.json(ownersID);
                      }).catch((e: Error) => {
                    console.error(e.stack);
                });
        });

        router.get("/animalnamesSuggestions",
                   (req: Request, res: Response, next: NextFunction) => {
            const searchEntry: string = req.body;
         // Send the request to the service and send the response
            this.databaseService.GetAnimalNamesFromSearchEntry(searchEntry).then((result: pg.QueryResult) => {
             const animalnames: string[] = result.rows.map((row: any) => row.animalname);
             res.json(animalnames);
           }).catch((e: Error) => {
         console.error(e.stack);
            });
        });

        router.get("/animalsSearch",
                   (req: Request, res: Response, next: NextFunction) => {
            const animalname: string = req.body;
            // Send the request to the service and send the response
            this.databaseService.GetAnimalsFromAnimalName(animalname).then((result: pg.QueryResult) => {
            const animals: Animal[] = result.rows.map((a: any) => (
                {
                animalid : a.animalid,
                animalname: a.animalname,
                animaltype: a.animaltype,
                description: a.description,
                inscriptiondate: a.inscriptiondate,
                animalstate: a.animalstate,
                ownerid: a.ownerid
                }));
            res.json(animals);
            }).catch((e: Error) => {
            console.error(e.stack);
            });
        });

        router.get("/animal/treatments",
                   (req: Request, res: Response, next: NextFunction) => {
            const animalid: string = req.query.animalid;
            // Send the request to the service and send the response
            this.databaseService.GetTreatmentsFromAnimal(animalid).then((result: pg.QueryResult) => {
            const treatments: Treatment[] = result.rows.map((t: any) => (
                {
                treatmentnumber: t.treatmentnumber,
                description: t.description,
                treatmentcost: t.treatmentcost
                }));
            res.json(treatments);
            }).catch((e: Error) => {
            console.error(e.stack);
            });
        });

        router.get("/animal/bill",
                   (req: Request, res: Response, next: NextFunction) => {
            const animalid: string = req.query.animalid;
            // Send the request to the service and send the response
            this.databaseService.GetBillFromAnimal(animalid).then((result: pg.QueryResult) => {
            res.json(result.rows[0].sum);
            }).catch((e: Error) => {
            console.error(e.stack);
            });
        });

        return router;
    }
}
