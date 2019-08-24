const session = {};

const Manager = {
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

export default Manager;