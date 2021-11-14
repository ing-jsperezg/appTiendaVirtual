import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedores} from './proveedores.model';

@model()
export class Productos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  detalle: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Proveedores)
  proveedoresId: string;

  @property({
    type: 'string',
  })
  pedidosId?: string;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
