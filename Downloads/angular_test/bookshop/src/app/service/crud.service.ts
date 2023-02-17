import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs'
import { Book } from './book';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Node API
 REST_API: string = "http://localhost:8000/api";
 //set Http Headers.
 httpHeaders= new HttpHeaders().set('Content-Type', 'application/json')
  constructor( private httpClient:HttpClient) { }
 // ajouter des enregistrements
  AddBook(data:Book):Observable<any>{
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }

  // get tous les details des books
  getBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  //get un seul livre 
  getBook(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  //update data book

  updateBook(id:any, data:any):Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, {headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

   //delete data book

   deleteBook(id:any):Observable<any>{
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, {headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // Handle Client side error
      errorMessage = error.error.message;
    }else {
      // Handle serVer side error
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
