import { Component, OnInit } from '@angular/core';

// importar services
import { ProductoServiceService } from 'src/app/services/producto.service.service';
import { SwitchModalService } from 'src/app/services/switch-modal.service';

// importar modelo
import { Producto } from 'src/app/models/producto.model';

// toastify
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {

  constructor(
    private productosServices:ProductoServiceService,
    private toastService:ToastService,
    private switchModal:SwitchModalService
  ){}

  // estado del modal
  modalSwitch:boolean = false;
  // producto que se envia al modal
  productoToUpdate?:Producto;

  // abrir el modal, cambiar el estado de modalwswitch
  openModal(){
    this.modalSwitch = true;
    this.productoToUpdate = undefined;
  }

  // productos a renderizar 
  productos:Producto[] = [];
  
  // caga principal del componente
  ngOnInit(): void {
    // renderizar los productos
    this.productosServices.getAllProducts()
      .subscribe(productos => {
        this.productos = productos;
      })

    // obteniendo del estado del modal y actualizandolo de una vez
    this.switchModal.$modal.subscribe(state => {
      this.modalSwitch = state;
    })
  }

  // ingresando el nuevo producto al array donde están los otros productos
  addProducts(producto:Producto){
    this.productos = [...this.productos, producto];
  }

  // actualizando el producto
  updateProduct(producto:Producto){
    const indexProduct = this.productos.findIndex(product => product.id == producto.id);
    this.productos.splice(indexProduct, 1, producto);
  }

  // eliminar producto
  deleteProduct(id:any, index:number){
    // obteniendo los productos y renderizarlos en la vista
    this.productosServices.delteProducto(id)
      .subscribe(() => {
        this.productos.splice(index, 1);
        this.toastService.success('Producto eliminado con exito!')
      })
  }

  // enviar el producto a actualizar al modal
  sendProductToUpdate(producto:Producto){
    this.openModal();
    this.productoToUpdate = producto;
  }

}