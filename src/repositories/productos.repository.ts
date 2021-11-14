import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Productos, ProductosRelations, Proveedores} from '../models';
import {ProveedoresRepository} from './proveedores.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly proveedores: BelongsToAccessor<Proveedores, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('ProveedoresRepository') protected proveedoresRepositoryGetter: Getter<ProveedoresRepository>,
  ) {
    super(Productos, dataSource);
    this.proveedores = this.createBelongsToAccessorFor('proveedores', proveedoresRepositoryGetter,);
    this.registerInclusionResolver('proveedores', this.proveedores.inclusionResolver);
  }
}
