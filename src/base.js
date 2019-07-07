const { Controller } = require("ada-cloud-util/boost");
const Result = require("ada-cloud-util/result");
const Session = require("./session");

class BaseController extends Controller {
    beforeExcute({ context, action }) {
        let { needLogin } = action;
        if (needLogin !== false) {
            let { token } = context.header, ps = Promise.resolve();
            if (token) {
                ps = ps.then(() => {
                    return Session.has(token);
                });
            } else {
                ps = ps.then(() => false);
            }
            return ps.then(result => {
                if (!result) {
                    context.set("Content-Type", "application/json");
                    context.response.body = Result.getLoginResult().getResponseData();
                    return false;
                }
            });
        }
    }
}

module.exports = BaseController;