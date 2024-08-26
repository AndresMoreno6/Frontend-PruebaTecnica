import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { PresupuestoComponent } from './componentes/presupuesto/presupuesto.component';
import { ResumenComponent } from './componentes/resumen/resumen.component';
import { HistorialComponent } from './componentes/historial/historial.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent, PresupuestoComponent, RouterModule,
    ResumenComponent, HistorialComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  languages = ['es', 'de']

  //Servicio de Translate
   private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.establecerIdiomaPorDefecto();
    const defaultLange = localStorage.getItem('language') || 'es';
    this.translateService.setDefaultLang(defaultLange);
    this.translateService.use(defaultLange);
  }

  //Funcion para cambiar el idioma dependiendo la opcion del select
  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;
    this.changeLanguage(selectedLanguage);
  }


  //Funcion para cambiar el idioma
  changeLanguage(lang: string){
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
  }


  establecerIdiomaPorDefecto() {
    if (typeof localStorage !== 'undefined' && !localStorage.getItem('idioma')) {
      localStorage.setItem('idioma', 'es');
    }
  }
}

