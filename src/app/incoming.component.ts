import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

@Component({
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {
	clients: FirebaseListObservable<any[]>;

	constructor(public afDB: AngularFireDatabase) {
		this.clients = afDB.list('clients', {
			query: {
				orderByChild: 'isCompleted',
				equalTo: false
			}
		});
	}

	hide(key) {
		const promise = this.clients.update(key, { isCompleted: true });
		promise
			.then(_ => console.log('Update succeded!'))
			.catch(err => console.log(err, 'Something happened at updating...'));
	}
}
