import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authenticationMiddleware from '../../middleware/authentiction.middleware';

const routes = Router();
// routes.post('/',controllers.create);
//api /users
routes
  .route('/')
  .get(authenticationMiddleware,controllers.getMany)
  .post(controllers.create);
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);

//authertions
routes.route('/authenticate').post(controllers.authenticate);
export default routes;
