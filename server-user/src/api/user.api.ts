import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { G_ERROR_DUPLICATE } from '../../../shared/constants/constants';

const router = Router();

/**
 * single
 */
router.get('/:id', async (req: any, res, next) => {
	try {
		res.send(await userController.findById(req.user, req.params.id, parseInt(req.query.type, 10), req.query.fields));
	} catch (error) {
		next(error);
	}
});

/**
 * list
 */
router.get('/', async (req: any, res, next) => {
	try {
		res.send(await userController.findMany(req.user, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * Follow
 */
router.post('/:id/follow', async (req: any, res, next) => {
	try {
		res.send(await userController.toggleFollow(req.user, req.params.id));
	} catch (error) {
		next(error);
	}
});

/**
 * create
 */
router.post('/', async (req, res, next) => {
	try {
		res.send(await userController.create(req.body));
	} catch (error) {
		if (error) {
			if (error.name === 'ValidationError') {
				res.status(409).send({ code: G_ERROR_DUPLICATE, field: Object.keys(error.errors)[0] });
				return;
			}
		}

		next(error);
	}
});

/**
 * update password
 */
router.put('/password', async (req: any, res, next) => {
	console.log('PASSWQORD');
	try {
		res.send(await userController.updatePassword(req.user, req.body.token, req.body.password));
	} catch (error) {
		next(error);
	}
});

/**
 * update
 */
router.put('/:id', async (req: any, res, next) => {
	try {
		res.send(await userController.update(req.user, req.params.id, req.body));
	} catch (error) {
		next(error);
	}
});

/**
 * delete
 */
router.delete('/:id', async (req: any, res, next) => {
	console.log('DELETE!!');
	try {
		res.send(await userController.remove(req.user, req.params.id));
	} catch (error) {
		next(error)
	}
});

export = router;