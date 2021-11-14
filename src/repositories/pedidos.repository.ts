import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Pedidos, PedidosRelations, Usuarios, Productos} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {ProductosRepository} from './productos.repository';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.id,
  PedidosRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Pedidos.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Productos, typeof Pedidos.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Pedidos, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
