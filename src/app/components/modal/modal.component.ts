import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// importamos el observable
import { SwitchModalService } from 'src/app/services/switch-modal.service';
// servicio para guardar la data
import { ProductoServiceService } from 'src/app/services/producto.service.service';
// notificaciones
import { ToastService } from 'angular-toastify';
// modelo
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {

  constructor(
    private modalSwitch:SwitchModalService,
    private productService:ProductoServiceService,
    private toastService:ToastService
  ){}

  // valores del formulario
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
  });

  // el padre envia si hay un productco a actualizar
  @Input() productoAActualizar?:Producto;

  estado:boolean = false;

  // verificando si el formulario tiene valores o no
  ngOnInit() {

    if (this.productoAActualizar) {
      // cambiando el estado para saber que servicio se va a ejecutar
      this.estado = true;
      // seteando los valores a los inputs del formulario
      this.form.setValue({
        id: this.productoAActualizar.id,
        title: this.productoAActualizar.title,
        description: this.productoAActualizar.description,
        price: this.productoAActualizar.price,
        stock: this.productoAActualizar.stock,
      });
    }
  
  }

  // cerrando el modal
  closeModal(){
    this.productoAActualizar = undefined;
    this.modalSwitch.$modal.emit(false);
  }

  // enviando nuevo registro al array que renderiza la vista
  @Output() addProduct = new EventEmitter<Producto>();
  // actualizando la vista con el producto actualizado
  @Output() updateProduct = new EventEmitter<Producto>();

  
  // envento de envio de datos
  onSubmit(){

    // validando que la informacion sea correcta
    if (this.form.valid) {
      // guardando la informacion del formulario
      const data = this.form.value;

      // esquema del nuevo producto
      const product:Producto = {
        id: parseInt(data.id!),
        title: data.title!,
        description: data.description!,
        price: Number(data.price),
        stock: Number(data.stock),
      }

      // verificando que servicio se va a ejecutar
      if (!this.productoAActualizar) {

        // agregando producto
        this.productService.createProduct(product)
        .subscribe(res => {
          this.addProduct.emit(res);
          this.closeModal();
        });
        // mensaje de confirmacion
        this.toastService.success('Producto Agregado!');
        
      } else {

        // actualizar producto
        this.productService.updateProdcut(product)
        .subscribe(res => {
          this.updateProduct.emit(res);
          this.closeModal();
        });
        // mensaje de confirmacion
        this.toastService.success('Producto Actualizado!');
      
      }

      // en caso tal de que alguna validacion no esté bien
    } else {
      this.toastService.error('Todos los campos deben tener valor!');
    }
    
  }

}