import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesService } from 'src/app/services/movies.service';
import { ActionSheetController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  @Input() id;
  public token;
  public identity;
  movie: PeliculaDetalle = {};
  actors: Cast[] = [];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  oculto: number = 150;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  estrella: string = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    public storage: LocalStorageService,
    public actionSheetController: ActionSheetController,
    public _userService: LoginService,
    public toastController: ToastController
  ) {
    // eslint-disable-next-line no-underscore-dangle
    this.token = this._userService.getToken();
        // eslint-disable-next-line no-underscore-dangle
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    this.moviesService.getMovieDetail(this.id).subscribe((resp) => {
      this.movie = resp;
    });

    this.moviesService.getActorMovies(this.id).subscribe((resp) => {
      this.actors = resp.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async presentActionSheet() {
    if (this.identity === 'administrador') {
      this.moviesService.getMovieDetail(this.id).subscribe((resp) => {
        this.movie = resp;
      });
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        buttons: [
          {
            text: 'Agregar a favoritos',
            icon: 'heart',
            handler: () => {
              this.storage.guardarPelicula(this.movie);
              this.presentToast();
            },
          },
        ],
      });
      await actionSheet.present();
      const { role } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    } else {
      console.log('No cuentas con los permisos del admnistrador.');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La pelicula se ha agregado a favoritos.',
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }
}
