import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Animal} from '../../../common/tables/Animal';
// import {Hotel} from "../../../common/tables/Hotel";
import {Room} from '../../../common/tables/Room';
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
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        // router.get("/hotel",
        //            (req: Request, res: Response, next: NextFunction) => {
        //             // Send the request to the service and send the response
        //             this.databaseService.getHotels().then((result: pg.QueryResult) => {
        //             const hotels: Hotel[] = result.rows.map((hot: any) => (
        //                 {
        //                 hotelno: hot.hotelno,
        //                 hotelname: hot.hotelname,
        //                 city: hot.city
        //             }));
        //             res.json(hotels);
        //         }).catch((e: Error) => {
        //             console.error(e.stack);
        //         });
        //     });

        router.get("/hotel/hotelNo",
                   (req: Request, res: Response, next: NextFunction) => {
                      this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
                        const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
                        res.json(hotelPKs);
                      }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                  });

        router.post("/hotel/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const hotelNo: string = req.body.hotelNo;
                        const hotelName: string = req.body.hotelName;
                        const city: string = req.body.city;
                        this.databaseService.createHotel(hotelNo, hotelName, city).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.get("/rooms",
                   (req: Request, res: Response, next: NextFunction) => {

                    // this.databaseService.getRoomFromHotel(req.query.hotelNo, req.query.roomType, req.query.price)
                    this.databaseService.getRoomFromHotelParams(req.query)
                    .then((result: pg.QueryResult) => {
                        const rooms: Room[] = result.rows.map((room: Room) => (
                            {
                            hotelno: room.hotelno,
                            roomno: room.roomno,
                            typeroom: room.typeroom,
                            price: parseFloat(room.price.toString())
                        }));
                        res.json(rooms);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        router.post("/rooms/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                    const room: Room = {
                        hotelno: req.body.hotelno,
                        roomno: req.body.roomno,
                        typeroom: req.body.typeroom,
                        price: parseFloat(req.body.price)};
                    console.log(room);

                    this.databaseService.createRoom(room)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
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
    console.log("oid: ", ownerid);
    console.log("aid: ", animalid);
// tslint:disable-next-line: max-line-length
// delete the animal THEN queries all the remaining animals for subscribe
    this.databaseService.deleteAnimal(animalid, ownerid).then(()=>{res.json();}).catch();
    // this.databaseService.getAnimals().then((result: pg.QueryResult) => {
    //     const animals: Animal[] = result.rows.map((a: any) => (
    //     {
    //         animalid : a.animalid,
    //         animalname: a.animalname,
    //         animaltype: a.animaltype,
    //         description: a.description,
    //         inscriptiondate: a.inscriptiondate,
    //         animalstate: a.animalstate,
    //         ownerid: a.ownerid
    //     }));
    //     res.json(animals);
    // }).catch((e: Error) => {
    // console.error(e.stack);
    // res.json(-1);
    //     });
    });

        router.put("/animal/update",
                   (req: Request, res: Response, next: NextFunction) => {
                    const animalid: string = req.body.animalid;
                    const animalname: string = req.body.animalname;
                    const animaltype: string = req.body.animaltype;
                    const description: string = req.body.description;
                    const inscriptiondate: string = req.body.inscriptiondate;
                    const animalstate: string = req.body.animalstate;
                    const ownerid: string = req.body.ownerid;
                    this.databaseService.createAnimal(animalid, animalname, animaltype, description, inscriptiondate, animalstate, ownerid);

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
            const animalid: string = req.body;
            // Send the request to the service and send the response
            this.databaseService.GetTreatmentsFromAnimal(animalid).then((result: pg.QueryResult) => {
            const treatments: Treatment[] = result.rows.map((t: any) => (
                {
                treatmentnumber: t.tratmentNumber,
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
            const animalid: string = req.body;
            // Send the request to the service and send the response
            this.databaseService.GetBillFromAnimal(animalid).then((result: pg.QueryResult) => {
            res.json(result);
            }).catch((e: Error) => {
            console.error(e.stack);
            });
        });

        return router;
    }
}
