import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/common/footer/footer";
import { Header } from './components/common/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'photostock-frontend';
}
