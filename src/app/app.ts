import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { BlessingComponent } from './components/blessing/blessing.component';
import { Rings3dComponent } from './components/rings-3d/rings-3d.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    BlessingComponent,
    Rings3dComponent,
    LocationsComponent,
    ConfirmationComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
