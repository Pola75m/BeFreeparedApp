//plik ze wszystkimi routami...
import { NgModule } from '@angular/core'; //przydatne
import { RouterModule, Routes ,RouterOutlet } from '@angular/router'; //potrzebne do poruszania się między componentami
import { HomeComponent } from './home/home.component'; //ten i niżej componenty
import { MyListComponent } from './my-lists/my-lists.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GalleryComponent } from "./gallery/gallery.component";
import { CommunitygalleryComponent } from './communitygallery/communitygallery.component';
import { MyCalendarPageComponent } from "./my-calendar-page/my-calendar-page.component";
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from "./auth.guard"; //plik do autentykacji userów



//export routes wszystkich componentów
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-lists', component: MyListComponent, canActivate: [AuthGuard] }, //bez zalogowania nie beda widoczne
  { path: 'calendar-page', component: CalendarPageComponent, canActivate: [AuthGuard] },
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard]},
  { path: 'community-gallery', component: CommunitygalleryComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'my-calendar-page', component: MyCalendarPageComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // defaultowa strona
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterOutlet]
})
export class AppRoutingModule { }
