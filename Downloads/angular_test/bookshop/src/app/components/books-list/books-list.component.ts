import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  //Lister tous les books
   Books:any =[];
    constructor( private crudApi:CrudService){}
    ngOnInit(): void {
      this.crudApi.getBooks().subscribe(res=>{
        console.log(res);
        this.Books = res;
      })
    }
    delete(id:any, i:any){
      console.log(id);
      if(window.confirm('Etes tu sûr de vouloir supprimer ?')){
        this.crudApi.deleteBook(id).subscribe(res=>{
          this.Books.splice(i, 1);
        })
      }
    }
  }
