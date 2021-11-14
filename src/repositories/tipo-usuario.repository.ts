import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {TipoUsuario, TipoUsuarioRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class TipoUsuarioRepository extends DefaultCrudRepository<
  TipoUsuario,
  typeof TipoUsuario.prototype.id,
  TipoUsuarioRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuarios, typeof TipoUsuario.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(TipoUsuario, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
