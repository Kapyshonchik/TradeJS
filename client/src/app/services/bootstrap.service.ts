import { Injectable } from '@angular/core';
import { app } from '../../core/app';

@Injectable()
export class BootstrapService {

	public async load() {
		if (!app.isReady)
			await new Promise((resolve, reject) => app.once('ready', resolve));
	}
}