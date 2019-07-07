const session = {};

module.exports = {
    get(key) {
        return Promise.resolve(session[key]);
    },
    set(key, value) {
        session[key] = value;
        return Promise.resolve();
    },
    has(key) {
        return Promise.resolve(session[key] !== undefined);
    }
};