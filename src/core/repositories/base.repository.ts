import { Repository } from 'typeorm';

export abstract class BaseRepository<Entity> extends Repository<Entity> {}
