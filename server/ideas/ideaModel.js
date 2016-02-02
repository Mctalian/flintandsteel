/* global exports */

function Idea(title, description, authorId, eventId, tags, rolesreq, ratings) {
    "use strict";

    var now = new Date().toISOString();

    this.title = title;
    this.description = description;
    this.authorId = authorId;
    this.eventId = eventId;
    this.timeCreated = now;
    this.timeModified = now;
    this.tags = tags;
    this.rolesreq = rolesreq;
    this.likes = [];
    this.updates = [];
    this.comments = [];
    this.backs = [{
        text: "Idea Owner",
        authorId: this.authorId,
        timeCreated: new Date().toISOString(),
        timeModified: '',
        types: [{name: "Owner", _lowername: "owner"}]
    }];
    this.team = [{memberId: this.authorId}];
    this.value = [{
        stars:4,
        authorId: this.authorId
    }],
    this.complexity = [{
        stars:2,
        authorId: this.authorId
    }];

    return this;
}

exports.create = function(title, description, authorId, eventId, tags, rolesreq, ratings) {
    "use strict";

    return new Idea(title, description, authorId, eventId, tags, rolesreq, ratings);
};
