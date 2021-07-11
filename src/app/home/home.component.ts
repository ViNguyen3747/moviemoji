import { Component, OnInit, ViewChild } from '@angular/core';
import { EmojiService } from './emoji.service';
import { IEmoji, IMovie, ISort } from '../shared/interface';
import { MovieService } from './movie.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { NoResultsComponent } from '../no-results/no-results.component';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emojiList: IEmoji[] =[];
  selectable = true;
  removable = true;
  genreList: string[] = [''];
  selectedEmoji: IEmoji[] = [];
  total_results: number = 0;
  movieList: IMovie[] = [];
  loading: boolean = false;
  sortOption: ISort[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  sortControl = new FormControl('popularity.desc');

  constructor(private emojiService: EmojiService, private movieService: MovieService,
              private details: MatDialog) { }

  ngOnInit(): void {
    this.emojiService.getEmoji().subscribe({
      next: data => this.emojiList = data
    })
    this.emojiService.getSorts().subscribe({
      next: data => this.sortOption = data
    })
    this.sortControl.valueChanges.subscribe(selectedSort => {
      this.getMovieList(this.genreList,1,selectedSort);      
      this.paginator.firstPage();      
    })
    
  }
  
  add(e: IEmoji) {
    if (e && this.selectedEmoji.indexOf(e) < 0) {
      this.selectedEmoji.push(e);
      if(e.categories == 'genre') {        
        this.genreList.push(e.id);
      }
    }
    this.paginator.firstPage();
    this.getMovieList(this.genreList, 1, this.sortControl.value);
  }
  
  getMovieList(genre: string[], page: number, sort: string) {    
    this.loading = true;
    console.log(this.genreList);
    this.movieService.getMovies(genre.join(','),page,sort).subscribe({
      next: data => {
        this.movieList = data.results;      
        this.total_results = data.total_results;
        this.movieList.forEach(
          movie => {
            if(movie.poster_path) {
              movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path;
            }
            if(movie.backdrop_path) {
              movie.backdrop_path = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            }
            movie.vote_average *= 10;
        })
        this.loading = false;
        if (this.total_results === 0) {
          this.details.open(NoResultsComponent);
        }
      },
      error: err => console.log(err)
    });
  }

  remove(e: IEmoji) {
    this.loading = true;
    if(this.selectedEmoji.indexOf(e) >= 0) {
      this.selectedEmoji.splice(this.selectedEmoji.indexOf(e), 1);
      this.genreList.splice(this.genreList.indexOf(e.id), 1);
    }
    if(this.selectedEmoji.length == 0) {
      this.movieList = [];
      this.total_results = 0;     
      this.loading = false;
    } else {      
      this.paginator.firstPage();
      this.getMovieList(this.genreList, 1, this.sortControl.value);    
    }
  }

  getNextList(e: PageEvent) {
    this.getMovieList(this.genreList, e.pageIndex + 1,this.sortControl.value);
  }

  openDialog(movie: IMovie) {
    this.details.open(DetailsComponent, {
      data: movie
    });
  }
}
