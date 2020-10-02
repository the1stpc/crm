import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/layouts/services/categories.service';
import { Category } from '../shared/layouts/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private CategoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.CategoriesService.fetch()
    
  }
}