const BaseController = require("../../base");
const Session = require('../../session');

class TextController extends BaseController {
    static configure = {
        basePath: "/api/user",
        actions: {
            login: { path: "/login", method: 'get', needLogin: false },
            getAllUsers: { path: "/list", method: 'get' },
            addUser: { path: "/add", method: 'post' },
            check: { path: "/check", method: "get", needLogin: false },
            getUserByIds: { path: '/items', method: 'get' }
        }
    }

    login({ request }) {
        let { username, password } = request.query;
        return this.service.get('/app-service-uc/user/login', { username, password }).then(({ code, data, message }) => {
            if (code === 0) {
                return Session.set(data, data).then(() => this.success(data));
            } else {
                return this.error(message);
            }
        });
    }

    check({ context }) {
        let { token } = context.header;
        return Session.has(token);
    }

    getAllUsers({ request }) {
        return this.service.get('/app-service-uc/user/list', request.query);
    }

    addUser({ request }) {
        return this.service.post('/app-service-uc/user/add', request.body);
    }

    getUserByIds({ request }) {
        return this.service.get('/app-service-uc/user/items', request.query);
    }

}

module.exports = TextController;