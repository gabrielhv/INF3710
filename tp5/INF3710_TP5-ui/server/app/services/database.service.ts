import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Room } from "../../../common/tables/Room";
import {schema} from "../createSchema";
import {data} from "../populateDB_VSF";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "normal_user",
        database: "VetoSansFrontieresDB",
        password: "admin",
        port: 5432,
        host: "localhost",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

/* fonctions propres a VetoSansFrontieres */

    public createSchema(): Promise<pg.QueryResult> {
    this.pool.connect();

    return this.pool.query(schema);
}

    public populateDb(): Promise<pg.QueryResult> {
    this.pool.connect();

    return this.pool.query(data);
}

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    this.pool.connect();

    return this.pool.query(`SELECT * FROM VetoSansFrontieresDB.${tableName};`);
}

    public getAnimals(): Promise<pg.QueryResult> {
    this.pool.connect();

    return this.pool.query('SELECT * FROM VetoSansFrontieresDB.animal;');
}

// animalID, animalName, animalType, description, inscriptionDate, animalState, ownerID
// tslint:disable-next-line: max-line-length
    public createAnimal(animalID: string, animalName: string, animalType: string, description: string, inscriptionDate: string, animalState: string, ownerID: string): Promise<pg.QueryResult> {
    this.pool.connect();
    const values: string[] = [
        animalID,
        animalName,
        animalType,
        description,
        inscriptionDate,
        animalState,
        ownerID,
    ];
    const queryText: string = `INSERT INTO VetoSansFrontieresDB.animal VALUES($1, $2, $3, $4, $5, $6, $7);`;

    return this.pool.query(queryText, values);
}
    public deleteAnimal(animalID: string, ownerID: string): Promise<pg.QueryResult> {
// tslint:disable-next-line: no-floating-promises
    this.pool.connect();
    const values: string[] = [
        animalID,
        ownerID,
    ];
    const queryText: string = `DELETE FROM VetoSansFrontieresDB.animal WHERE VetoSansFrontieresDB.animal.animalID = VALUES($1) AND ownerID = VALUES($2);`;
    return this.pool.query(queryText, values);
    }

    public UpdateAnimal(animalID: string, animalName: string, animalType: string, description: string, inscriptionDate: string, animalState: string, ownerID: string): Promise<pg.QueryResult> {
// tslint:disable-next-line: no-floating-promises
        this.pool.connect();
        const values: string[] = [
            animalID,
            animalName,
            animalType,
            description,
            inscriptionDate,
            animalState,
            ownerID,
        ];
        const queryText: string = `UPDATE VetoSansFrontieresDB.animal SET animalName = VALUES($2), animalType = VALUES($3), description = VALUES($4), inscriptionDate = VALUES($5), animalState = VALUES($6);`;
        return this.pool.query(queryText, values);
    }

    public getOwnersID(): Promise<pg.QueryResult> {
        this.pool.connect();
        const queryText: string = `SELECT ownerID FROM VetoSansFrontieres.owner;`;
        return this.pool.query(queryText);
    }

    //pour les suggestions de la search bar
    public GetAnimalNamesFromSearchEntry(searchEntry: string): Promise<pg.QueryResult>{
        this.pool.connect();
// tslint:disable-next-line: max-line-length
        const queryText: string = "SELECT a.animalName FROM VetoSansFrontieresDB.animal a WHERE LOWER(a.animalName) LIKE LOWER'%" + searchEntry + "%';";
        return this.pool.query(queryText);
    }

    public GetAnimalsFromAnimalName(searchEntry: string): Promise<pg.QueryResult>{
        this.pool.connect();
// tslint:disable-next-line: max-line-length
        const queryText: string = "SELECT * FROM VetoSansFrontieresDB.animal a WHERE LOWER(a.animalName) LIKE LOWER'%" + searchEntry + "%';";
        return this.pool.query(queryText);
    }
    
    public GetTreatmentsFromAnimal(animalID: string): Promise<pg.QueryResult> {
        this.pool.connect();
// tslint:disable-next-line: max-line-length
        const queryText: string = "SELECT t.* FROM (SELECT tr.*, ex.animalID from VetoSansFrontieresDB.examDetails ex NATURAL JOIN VetoSansFrontieresDB.treatmentDetails tr) as T1 NATURAL JOIN VetoSansFrontieresDB.treatment t WHERE T1.animalID = '" + animalID + "';";
        return this.pool.query(queryText);
    }

    public GetBillFromAnimal(animalID: string): Promise<pg.QueryResult> {
        this.pool.connect();
// tslint:disable-next-line: max-line-length
        const queryText: string = "SELECT SUM(treatmentcost) FROM (SELECT tr.*, ex.animalID from VetoSansFrontieresDB.examDetails ex NATURAL JOIN VetoSansFrontieresDB.treatmentDetails tr) as T1 NATURAL JOIN VetoSansFrontieresDB.treatment t WHERE T1.animalID = '" + animalID + "';";
        return this.pool.query(queryText);
    }

    /*

        METHODES DE DEBUG
    */
    // public createSchema(): Promise<pg.QueryResult> {
    //     this.pool.connect();

    //     return this.pool.query(schema);
    // }

    // public populateDb(): Promise<pg.QueryResult> {
    //     this.pool.connect();

    //     return this.pool.query(data);
    // }

    // public getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    //     this.pool.connect();

    //     return this.pool.query(`SELECT * FROM HOTELDB.${tableName};`);
    // }

    // HOTEL
    // public getHotels(): Promise<pg.QueryResult> {
    //     this.pool.connect();

    //     return this.pool.query('SELECT * FROM HOTELDB.HOTEL;');
    // }

    public getHotelNo(): Promise<pg.QueryResult> {
        this.pool.connect();

        return this.pool.query('SELECT hotelNo FROM HOTELDB.Hotel;');
    }

    public createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            hotelNo,
            hotelName,
            city
        ];
        const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;

        return this.pool.query(queryText, values);
    }

    // ROOM
    public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {
        this.pool.connect();

        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }


    public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {
        this.pool.connect();

        let query: string = 'SELECT * FROM HOTELDB.room \n';
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);

    }

    public createRoom(room: Room): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            room.roomno,
            room.hotelno,
            room.typeroom,
            room.price.toString()
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    // GUEST
    public createGuest(guestNo: string,
                       nas: string,
                       guestName: string,
                       gender: string,
                       guestCity: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            guestNo,
            nas,
            guestName,
            gender,
            guestCity
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    // BOOKING
    public createBooking(hotelNo: string,
                         guestNo: string,
                         dateFrom: Date,
                         dateTo: Date,
                         roomNo: string): Promise<pg.QueryResult> {
        this.pool.connect();
        const values: string[] = [
            hotelNo,
            guestNo,
            dateFrom.toString(),
            dateTo.toString(),
            roomNo
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
        }

}
