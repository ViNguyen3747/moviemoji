import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'urlPipe'
})
export class UrlPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
   transform(url: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

}
