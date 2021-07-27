import { Component, Input, OnInit } from '@angular/core';
import {
  MDBResponse,
  Pelicula,
  PeliculaDetalle,
} from 'src/app/interfaces/interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slide-show-backdrop',
  templateUrl: './slide-show-backdrop.component.html',
  styleUrls: ['./slide-show-backdrop.component.scss'],
})
export class SlideShowBackdropComponent implements OnInit {
  @Input() movies: PeliculaDetalle[] = [];
  constructor(
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {}
  async verDetalle(id: string | number) {
    const modal = await this.modalCtrl.create({
      component: MovieDetailComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  slideOpts = {
    slidesPerView: 1,
    freeMode: true,
  };
}
