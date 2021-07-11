import { Component, OnInit, NgZone, HostListener, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICast, IMovie, IProdCo, IProviders, ITrailer } from '../shared/interface';
import { DetailsService } from './details.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  value: number;
  casts: ICast[] = [];
  prods: IProdCo[] = [];
  videos: ITrailer[] = [];
  providers: IProviders;
  videoReady: boolean=false;
  constructor(public dialogRef: MatDialogRef<DetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public movie: IMovie,
              private detailService: DetailsService) {
    }

  ngOnInit(): void { 
    this.value = this.movie.vote_average * 10;
    this.detailService.getProdCompanies(this.movie.id.toString()).subscribe({
      next: data => {
        this.prods = data;
      }
    });
    this.detailService.getCast(this.movie.id.toString()).subscribe({
      next:data => {
        this.casts = data;
        this.casts.forEach(cast => {
          if(cast.profile_path) {
            cast.profile_path = this.getImage(cast.profile_path);
          }
        })
      }
    });
    this.detailService.getTrailer(this.movie.id.toString()).subscribe({
      next:data => {
        this.videos = data.filter(vid => vid.site == "YouTube" && vid.type == "Teaser" || vid.type == "Trailer");
        this.videos.forEach(vid => {
          if(vid.site == 'YouTube') {
            vid.key = 'https://www.youtube.com/embed/' + vid.key;
          }
        })        
        this.videoReady = true;
      }
    });
  }

  getImage(path: string): string {
    return 'https://image.tmdb.org/t/p/original' + path;
  }
  close() {
    this.dialogRef.close();    
  }

}
