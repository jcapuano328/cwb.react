'use strict'

/*
Object.prototype.clone = function() {
    let newObj = (this instanceof Array) ? [] : {};
    for (let i in this) {
        if (i == 'clone') {continue;}
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        } else {
            newObj[i] = this[i];
        }
    }
    return newObj;
};
*/

let clone = (o) => {
    let newObj = (o instanceof Array) ? [] : {};
    for (let i in o) {
        if (i == 'clone') {continue;}
        if (o[i] && typeof o[i] == "object") {
            newObj[i] = clone(o[i]);
        } else {
            newObj[i] = o[i];
        }
    }
    return newObj;
};

// deep copy of an object
module.exports = (o) => {
    return clone(o);
}
