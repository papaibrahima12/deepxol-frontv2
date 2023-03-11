import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ROUTES} from '../../sidebar/sidebar.component';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {UpgradeComponent} from "../../pages/upgrade/upgrade.component";
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Dossier} from "../../models/dossier";
import {AuthService} from "../../services/auth.service";
import {NavbarService} from "../../services/navbar.service";
import {TypographyComponent} from "../../pages/typography/typography.component";

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{

    public user = this.authservice.getUsername();
    public loggedIn = false;
    searchControl = new FormControl();
    filteredDossiers: Observable<string[]>;
    allDossiers: Dossier[];
    autoCompleteList: any[]

  private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    public isCollapsed = true;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();
  @ViewChild("navbar-cmp", {static: false}) button;
    fetchedDossier: Dossier[];

    constructor(
      private navbarservice:NavbarService,
      private _formBuilder: FormBuilder,
      private _matDialog: MatDialog,
      private readonly authservice: AuthService,
      location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
      this.navbarservice.getDossiers().subscribe(dossiers => {
        this.allDossiers = dossiers
      });
      this.searchControl.valueChanges.subscribe(userInput => {
        this.autoCompleteExpenseList(userInput);
      })
      this.loggedIn = !!this.authservice.currentUser;
      this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }
  filterCategoryList(val) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allDossiers.filter(s => s.dossierNumber.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allDossiers;
  }
  displayFn(dossier: Dossier) {
    return dossier ? dossier.dossierNumber : dossier;
  }

  filterPostList(event) {
    var dossiers = event.source.value;
    if (!dossiers) {
      this.navbarservice.searchOption = []
    }
    else {
      this.navbarservice.searchOption.push(dossiers);
      this.onSelectedOption.emit(this.navbarservice.searchOption)
    }
    this.focusOnPlaceInput();
  }

  removeOption(option) {

    let index = this.navbarservice.searchOption.indexOf(option);
    if (index >= 0)
      this.navbarservice.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.navbarservice.searchOption)
  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

  add() {
    this._matDialog.open(UpgradeComponent, {
      autoFocus: true,
      height: '60%',
      width: '60%'
    });
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  openDetails(dossier: Dossier):void  {
    this._matDialog.open(TypographyComponent, {
      autoFocus: false,
      data: {
        dossier
      },
      height: '60%',
      width: '60%'
    })
  }
}
