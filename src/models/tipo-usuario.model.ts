import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class TipoUsuario extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  permiso: string;

  @hasMany(() => Usuarios)
  usuarios: Usuarios[];

  constructor(data?: Partial<TipoUsuario>) {
    super(data);
  }
}

export interface TipoUsuarioRelations {
  // describe navigational properties here
}

export type TipoUsuarioWithRelations = TipoUsuario & TipoUsuarioRelations;
