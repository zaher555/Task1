import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from "./components/content/content.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  imports: [ ContentComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task';
}
