import { Router } from "express";
const routes=Router();
import * as controllers from"../../controllers/users.controllers";
// routes.post('/',controllers.create);
//api /users
routes.route('/').get(controllers.getMany).post(controllers.create);
routes.route('/:id')
.get(controllers.getOne)
.patch(controllers.updateOne)
.delete(controllers.deleteOne);
export default routes