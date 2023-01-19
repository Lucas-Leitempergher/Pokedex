import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

//Services
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  //private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
 // private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  private urlPokemon: string = 'http://brjgsd357198:5500/api/v2/pokemon';
  private urlName: string = 'http://brjgsd357198:5500/api/v2/pokemon-species';


  public pokemon: any;
  public isLoading : boolean = false;
  public apiError: boolean = false;
  public name: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon(){

    const id = this.activatedRoute.snapshot.params['id'];

    return forkJoin([
      this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`),
      this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`)
    ]).subscribe(
      ([res1,res2]) => {
        this.pokemon = res1;
        this.name = res2;
        this.isLoading = true;
      
      },
      (err) => {
        this.apiError = true;
      }); 
  }

}
