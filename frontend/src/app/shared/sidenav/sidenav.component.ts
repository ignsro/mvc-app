import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  navsItems = 
  [
    {
      label: 'Clientes',
      path: 'client'
    },
    {
      label: 'Productos',
      path: 'product'
    },
    {
      label: 'Ventas',
      path: 'sale'
    }
  ];

  ngOnInit(): void {
  }

}
