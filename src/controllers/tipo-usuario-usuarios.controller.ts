import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoUsuario,
  Usuarios,
} from '../models';
import {TipoUsuarioRepository} from '../repositories';

export class TipoUsuarioUsuariosController {
  constructor(
    @repository(TipoUsuarioRepository) protected tipoUsuarioRepository: TipoUsuarioRepository,
  ) { }

  @get('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of TipoUsuario has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.tipoUsuarioRepository.usuarios(id).find(filter);
  }

  @post('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TipoUsuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoUsuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInTipoUsuario',
            exclude: ['id'],
            optional: ['tipoUsuarioId']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    return this.tipoUsuarioRepository.usuarios(id).create(usuarios);
  }

  @patch('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TipoUsuario.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.usuarios(id).patch(usuarios, where);
  }

  @del('/tipo-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'TipoUsuario.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.usuarios(id).delete(where);
  }
}
