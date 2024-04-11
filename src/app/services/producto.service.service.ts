import { Injectable } from '@angular/core';
// para consumir el backend
import { HttpClient } from '@angular/common/http';
// importar modelo
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(
    private http:HttpClient
  ) {}

  // url del backend
  path:string =  'http://127.0.0.1:8000/api/productos';
  
  // obteniendo todos los productos
  getAllProducts(){
    return this.http.get<Producto[]>(this.path);
  }

  // crear producto
  createProduct(producto:Producto){
    return this.http.post<any>(this.path, producto);
  }

  // obtener un solo poducto
  getProductoById(id:number){
    return this.http.get<Producto>(`${this.path}/${id}`);
  }

  // actualizar producto
  updateProdcut(producto:Producto){
    return this.http.put<Producto>(`${this.path}/${producto.id}`, producto);
  }

  // eliminando producto
  delteProducto(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }
}