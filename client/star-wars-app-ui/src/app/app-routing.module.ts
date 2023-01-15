import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCharactersComponent } from './search/search-characters/search-characters.component';

const routes: Routes = [
  { path: 'search/characters', component: SearchCharactersComponent },
  { path: '', redirectTo: 'search/characters', pathMatch: 'full' },
  { path: '**', redirectTo: 'search/characters', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
