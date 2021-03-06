import * as request from 'request-promise';
import {IUser} from '../../../shared/interfaces/IUser.interface';
import { IReqUser } from '../../../shared/interfaces/IReqUser.interface';

const config = require('../../../tradejs.config');

export const emailController = {

    async findUserById(reqUser, userId: string, options: any = {}): Promise<IUser> {
		const user = await request({
			uri: config.server.notify.apiUrl + '/user/' + userId,
            headers: {'_id': reqUser.id},
            qs: options,
            json: true
        });
        
        return user;
	},

	async addUser(reqUser: IReqUser, params: IUser, updateWhenPresent = undefined): Promise<IUser> {
       
        const user = await request({
            uri: config.server.notify.apiUrl + '/user',
            headers: { '_id': params._id },
            method: 'POST',
            body: {
				_id: params._id,
                name: params.name,
                email: params.email
			},
            qs: {
				updateWhenPresent
			},
            json: true
        });

        return user;
    }
};