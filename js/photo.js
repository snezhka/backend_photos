const { generateInteger } = require('./helpers.js');
const { likes, comments, avatars, names, surNames, messages } = require('./constants.js');

module.exports = class Photo {
    static pid = 0;
    static titleNumber = 0;
    static descriptionNumber = 0;
    constructor() {
        let id = ++Photo.pid;
        this.id = id;
        this.url = `photos/${id}.jpg`;
        this.description = 'Описание';
        this.likes = generateInteger(likes.min, likes.max);
        this.comments = new Array(generateInteger(comments.min, comments.max)).fill(null).map(() => new Comment());
        Comment.cid = 0;
    }
}

class Comment {
    static cid = 0;
    constructor() {
        this.id = ++Comment.cid;
        this.avatar = `img/avatar-${generateInteger(avatars.min, avatars.max)}.svg`;
        this.message = messages[generateInteger(0, messages.length - 1)];
        this.name = `${names[generateInteger(0, names.length - 1)]} ${surNames[generateInteger(0, surNames.length - 1)]}`;
    }
}
