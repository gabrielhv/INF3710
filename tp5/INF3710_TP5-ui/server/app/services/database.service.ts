import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB_VSF";

@injectable()
export class DatabaseService {

    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "VetoSansFrontieresDB",
        password: "admin",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    public constructor() {
        this.pool.connect();
    }

    // A MODIFIER POUR VOTRE BD
    // public connectionConfig: pg.ConnectionConfig = {
        //     user: "normal_user",
        //     database: "VetoSansFrontieresDB",
        //     password: "admin",
        //     port: 5432,
        //     host: "127.0.0.1",
        //     keepAlive : true
        // };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

/* fonctions propres a VetoSansFrontieres */

    public createSchema(): Promise<pg.QueryResult> {
    return this.pool.query(schema);
}

    public populateDb(): Promise<pg.QueryResult> {
    return this.pool.query(data);
}

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    return this.pool.query(`SELECT * FROM VetoSansFrontieresDB.${tableName};`);
}

    public getAnimals(): Promise<pg.QueryResult> {
    return this.pool.query("SELECT * FROM VetoSansFrontieresDB.Animal;");
}

    public createAnimal(animalid: string, animalname: string, animaltype: string,
                        description: string, inscriptiondate: string, animalstate: string, ownerid: string): Promise<pg.QueryResult> {

    const values: string[] = [
        animalid,
        animalname,
        animaltype,
        description,
        inscriptiondate.toString(),
        animalstate,
        ownerid,
    ];
    const queryText: string = `INSERT INTO VetoSansFrontieresDB.animal VALUES($1, $2, $3, $4, $5, $6, $7);`;

    return this.pool.query(queryText, values);
}
    public deleteAnimal(animalid: string, ownerid: string): Promise<pg.QueryResult> {
        const queryText: string =
            "DELETE FROM VetoSansFrontieresDB.animal WHERE animalid = '" + animalid + "' AND ownerid ='" + ownerid + "';";

        return this.pool.query(queryText);
    }

    public updateAnimal(animalid: string, animalname: string, animaltype: string,
                        description: string, inscriptiondate: string, animalstate: string, ownerid: string): Promise<pg.QueryResult> {

        const values: string[] = [
            animalid,
            animalname,
            animaltype,
            description,
            inscriptiondate,
            animalstate,
            ownerid,
        ];
        const queryText: string =
            `UPDATE VetoSansFrontieresDB.animal `
            + `SET animalid = $1, animalname = $2, animaltype = $3, description = $4, inscriptiondate = $5, animalstate = $6, ownerid = $7 `
            + `WHERE animalid = $1 AND ownerid = $7;`;

        return this.pool.query(queryText, values);
    }

    public getOwnersID(): Promise<pg.QueryResult> {
        const queryText: string = `SELECT ownerid FROM VetoSansFrontieres.owner;`;

        return this.pool.query(queryText);
    }

    // pour les suggestions de la search bar
    public GetAnimalNamesFromSearchEntry(searchEntry: string): Promise<pg.QueryResult>{

        const queryText: string =
            "SELECT a.animalname FROM VetoSansFrontieresDB.animal a WHERE LOWER(a.animalname) LIKE LOWER'%" + searchEntry + "%';";

        return this.pool.query(queryText);
    }

    public GetAnimalsFromAnimalName(searchEntry: string): Promise<pg.QueryResult>{
        const queryText: string =
            "SELECT * FROM VetoSansFrontieresDB.Animal a WHERE LOWER(a.animalname) LIKE LOWER'%" + searchEntry + "%';";

        return this.pool.query(queryText);
    }

    public GetTreatmentsFromAnimal(animalid: string): Promise<pg.QueryResult> {
        const queryText: string =
            "SELECT t.*"
            + "FROM ("
            +   "SELECT tr.*, ex.animalid from VetoSansFrontieresDB.examDetails ex NATURAL JOIN VetoSansFrontieresDB.treatmentDetails tr)"
            +   " as T1 NATURAL JOIN VetoSansFrontieresDB.treatment t WHERE T1.animalid = '" + animalid + "';";

        return this.pool.query(queryText);
    }

    public GetBillFromAnimal(animalid: string): Promise<pg.QueryResult> {
        const queryText: string =
            "SELECT SUM(treatmentcost)"
            + "FROM ("
            +   "SELECT tr.*, ex.animalid from VetoSansFrontieresDB.examDetails ex NATURAL JOIN VetoSansFrontieresDB.treatmentDetails tr)"
            +   "as T1 NATURAL JOIN VetoSansFrontieresDB.treatment t WHERE T1.animalid = '" + animalid + "';";

        return this.pool.query(queryText);
    }
}
