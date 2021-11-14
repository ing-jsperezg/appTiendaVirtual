import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Productos,
  Proveedores,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosProveedoresController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/proveedores', {
    responses: {
      '200': {
        description: 'Proveedores belonging to Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedores)},
          },
        },
      },
    },
  })
  async getProveedores(
    @param.path.string('id') id: typeof Productos.prototype.id,
  ): Promise<Proveedores> {
    return this.productosRepository.proveedores(id);
  }
}
