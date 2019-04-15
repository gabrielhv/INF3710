import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import { Treatment } from "../../../common/tables/Treatment";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getAnimals(): Observable<any[]> {

        return this.http.get<Animal[]>(this.BASE_URL + "/animals").pipe(
            catchError(this.handleError<Animal[]>("getAnimals")),
        );
    }
    
    public getAnimalsSuggestions(searchEntry: string): Observable<any[]> {
        return this.http.get<Animal[]>(this.BASE_URL + "/animalnamesSuggestions/?animalname=" + searchEntry).pipe(
            catchError(this.handleError<Animal[]>("getAnimalsNameSuggestions")),
        );
    }

    public getAnimalsSearchResult(searchEntry: string): Observable<any[]> {
        return this.http.get<Animal[]>(this.BASE_URL + "/animalsSearch/?animalname=" + searchEntry).pipe(
            catchError(this.handleError<Animal[]>("getAnimalsSearchResult")),
        );
    }

    public getAnimalBill(animalid: string): Observable<number> {

        return this.http.get<number>(this.BASE_URL + "/animal/bill/?animalid=" + animalid).pipe(
            catchError(this.handleError<number>("getAnimalBill")),
        );
    }

    public getAnimalTreatments(animalid: string): Observable<Treatment[]> {

        return this.http.get<Treatment[]>(this.BASE_URL + "/animal/treatments/?animalid=" + animalid).pipe(
            catchError(this.handleError<Treatment[]>("getAnimalBill")),
        );
    }

    public insertAnimal(animal: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/animal/insert", animal).pipe(
            catchError(this.handleError<number>("insertAnimal")),
        );
    }

    public updateAnimal(animal: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/animal/update", animal).pipe(
            catchError(this.handleError<number>("updateAnimal")),
        );
    }

    public deleteAnimal(animal: Animal): Observable<Animal[]> {
        return this.http.delete<Animal[]>(
            this.BASE_URL + "/animal/delete/?ownerid=" + animal.ownerid + "&animalid=" + animal.animalid).pipe(
            catchError(this.handleError<Animal[]>("deleteAnimal")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
