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

    PlayMedia(mediaID) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`media/play`, { token: token, id: mediaID }, '', false)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetComments(commentableType, commentableID, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`comments`, { 
                    token: token, 
                    comment_type: commentableType,
                    comment_id: commentableID, 
                    page: pageNum,
                    size: pageSize
                 })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CreateComment(commentableType, commentableID, content, address = null) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`comments/create`, { 
                    token: token, 
                    comment_type: commentableType,
                    comment_id: commentableID, 
                    content: content,
                    address: address
                 })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    ReplyComment(commentID, content, to_user_id, address = null) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`comments/${commentID}/create_reply`, { 
                    token: token, 
                    to_user: to_user_id,
                    content: content,
                    address: address
                 })
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