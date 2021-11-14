import {Entity, model, property} from '@loopback/repository';

@model()
export class Proveedores extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<Proveedores>) {
    super(data);
  }
}

export interface ProveedoresRelations {
  // describe navigational properties here
}

export type ProveedoresWithRelations = Proveedores & ProveedoresRelations;
