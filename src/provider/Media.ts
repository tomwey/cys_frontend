import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Users } from './Users';

@Injectable()
export class Media {
    constructor(
        private api: ApiService,
        private users: Users,
    ) {

    }

    GetMedia(action, school = null, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`media/${action}`, { token: token, school:school, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CreateLike(mediaID) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`likes/create`, { token: token, like_id: mediaID })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    DeleteLike(mediaID) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`likes/delete`, { token: token, like_id: mediaID })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }
}