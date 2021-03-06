import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero;
  sub: any;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location){
  }

  goBack(): void{
    //let link = ['/heroes'];
    //this.router.navigate(link);
    this.location.back();
  }
  
  save(): void{
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  ngOnInit(): void {
   this.sub = this.route.params.subscribe(params => {
     let id = Number.parseInt(params['id']);
     this.heroService.getHero(id).then(hero => this.hero = hero);
   });
  } 

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
