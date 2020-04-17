import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FormComponent } from './pages/clientes/form/form.component';
import { FormproductosComponent } from './pages/productos/formproductos/formproductos.component';
import { FrmfacturasComponent } from './pages/clientes/frmfacturas/frmfacturas.component';
import { DetalleFacturaComponent } from './pages/clientes/frmfacturas/detalle-factura.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: '', redirectTo: '/dasboard', pathMatch: 'full'},
  {path: 'dasboard', component: DashboardComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'formcliente', component: FormComponent},
  {path: 'formcliente/:id', component: FormComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'formproducto', component: FormproductosComponent},
  {path: 'formproducto/:id', component: FormproductosComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent},
  {path: 'facturas', component: FacturasComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    ClientesComponent,
    ProductosComponent,
    FormComponent,
    FormproductosComponent,
    FrmfacturasComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule, ReactiveFormsModule, MatAutocompleteModule, 
    MatInputModule, MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
