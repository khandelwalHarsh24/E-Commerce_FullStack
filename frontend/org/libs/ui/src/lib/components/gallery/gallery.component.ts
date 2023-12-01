import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit{
  selectedImages: string;

  @Input() images: string[];

  ngOnInit(): void {
    if(this.images.length){
      this.selectedImages=this.images[0];
    }
  }

  onSelectImage(image:string){
    this.selectedImages=image;
  }

}
