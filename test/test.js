const expect = require('chai').expect;


//Mocha test for unread filter in message service
const unreadFilter = (user, objArray) => {
    for(let viewer of objArray) {
        if(viewer.user === user) {
            return true;
        }
    }
    return false;
};







describe('objArray Sorter Should determine whether there is an object with user name in it equal to the user that is currecntly clicking on the post', () => {
   it('Should return false for a user not in the array', () => {
        expect(unreadFilter('Michael', [{user: 'some person', avatar: ''}, {user: 'another person', avatar: ''}])).to.equal(false);
   });

    it('Should return true for a user in the array', () => {
        expect(unreadFilter('some person', [{user: 'some person', avatar: ''}, {user: 'another person', avatar: ''}])).to.equal(true);
    });
});



const viewArray = [{viewedBy: [{user: '901david', avatar:''}, {user: "another person", avatar:''}]}, {viewedBy: [{user: "another person", avatar:''}]}];

const filterRead = (arr, user) => {
    const unreadMessages = [];
    for (let item of arr) {
        let flag = false
        for(let itemObj of item.viewedBy) {
            console.log(itemObj.user, user);
            if(itemObj.user === user) {
                flag = true;
            }

        }
        if(!flag) {
            unreadMessages.push(item);
        }
    }

    return JSON.stringify(unreadMessages);
};

describe('Filter out messages that have your user name in the viewed by array', () => {
   it('should be able to return a new array of messages that have not been viewed by the user.', () => {
       expect(filterRead(viewArray, '901david')).to.equal(JSON.stringify([{viewedBy:[{user: "another person", avatar:''}]}]));
   })
});

