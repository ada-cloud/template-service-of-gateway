import { controller, action, remoteService } from "ada-cloud-util/boost/annotation";
import Result from "ada-cloud-util/result";
import BaseController from "../../base";
import Session from '../../session';

@controller({ path: '/api/user' })
class TextController extends BaseController {

    @remoteService()
    service = null;

    @action({ path: "/login", needLogin: false })
    login({ request }) {
        let { username, password } = request.query;
        return this.service.get('/app-service-uc/user/login', { username, password }).then(({ code, data, message }) => {
            if (code === 0) {
                return Session.set(data, data).then(() => Result.getSuccessResult(data));
            } else {
                return Result.getErrorResult(message);
            }
        });
    }
}

export default TextController;