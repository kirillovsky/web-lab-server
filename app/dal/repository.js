var mongojs = require('mongojs');

function normalizeId(entity) {
    var result = entity;
    entity.id = entity._id.toString();
    entity._id = undefined;
    delete entity._id;
    return entity;
}

class Repository {
    constructor(collectionName) {
        this.db = mongojs('mongodb://localhost:27017/myproject', [collectionName]);
        this.collectionName = collectionName;
    }

    findOne(filter) {
        return new Promise((resolve, reject) => {
            this.db[this.collectionName].findOne(filter, (err, entity) => {
                if(err) {
                    reject(err);
                } else {
                    if(entity) {
                        entity = normalizeId(entity);
                    }
                    resolve(entity);
                }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db[this.collectionName].find((err, entities) => {
                if(err) {
                    reject(err);
                } else {
                    entities = entities.map(e => normalizeId(e));
                    resolve(entities);
                }
            });
        });
    }

    getAllBy(ids) {
        return this.getAll().then(entities => {
            return entities.filter(e => ids.indexOf(e.id.toString()) != -1);
        });
    }

    getBy(id) {
        return this._getBy(id)
            .then(entity => normalizeId(entity));
    }


    save(newEntity) {
        newEntity = this._getEntity(newEntity);
        return new Promise((resolve, reject) => {
            this.db[this.collectionName].save(newEntity, (err, entity) => {
                if(err) {
                    reject(err);
                } else {
                    entity = normalizeId(entity);
                    resolve(entity);
                }
            });
        });
    }

    updateBy(id, patch) {
        // TODO: Разобраться, как запилить patch в моне.
        return this._getBy(id).then((entity) => {
            return new Promise((resolve, reject) => {
                let idObj = {_id: new mongojs.ObjectID(id) };
                this._copyEntity(entity, patch);
                this.db[this.collectionName].update(idObj, entity, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        entity = normalizeId(entity);
                        resolve(entity);
                    }
                });
            });
        });
    }

    removeBy(id) {
        let idObj = {_id:  new mongojs.ObjectID(id) };
        return new Promise((resolve, reject) => {
            this.db[this.collectionName].remove(idObj, (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    _getBy(id) {
        return new Promise((resolve, reject) => {
            let idObj = {_id:  new mongojs.ObjectID(id) };
            this.db[this.collectionName].findOne(idObj, (err, song) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(song);
                }
            });
        });
    }

    _getEntity(entity) { }

    _copyEntity(dest, src) {
        delete src['id'];
        delete src['_id'];
        // TODO: Заменить на переопределение в детях, ибо не безопасно.
        Object.assign(dest, src);
    }
}

module.exports = Repository;