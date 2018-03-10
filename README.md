# CompanyBlog
This is a mock internal blog for a company to use to allow employees to interact in a blog setting internally using GitHub OAuth


* Back-End:
    * Express Server using passport to support a GitHub Strategy. I used cookies to pass data to the Angular front end with a 10 hour expiration on the cookie.
    * I used Firebase as a database to users and messages.
    
* Front-End:
    * I used Angular for my front-end framework. I also took advantage of bootstrap, materialize, & flexbox.
    
* User Stories:
    * A user should be able to use their GitHub account to login to the blog site.
        * This was accomplished using Express/Passport with a GitHub strategy.
    * A user should be able to make blog posts as an individual.
        * This was accomplished by providing a sidebar that shows all user posts for users on your team.
    * A user should be able to make posts to groups.  The groups should be notified of a new post.
        * Right now you can post to any group but not become subscribed to a group. That implementation is in the works.
    * A user should be able to make a post in markdown and syntax should be supported.  
        * I implemented a solution using an npm package called angular2-markdown. It is an angular tag that can be used to render markdown.
    * A user should be able to view who has read their post.
           * Currently not implemented but I plan on using materialize chips to show who has viewed the posts.  I will accomplish this by keeping an array of viewed by objects containing te username and avatar url.
    * A user should be able to mark a post as read.
        * Not currently implemented, but I would like to add in functoinality that if you click the new button on an unread item, it should mark it as read.
    * Create group notifications that notify group members at the time of when the message was sent.
        * My current implementation does not support this.  My groups will be based off subscriptions, so if a message was sent to a group and then after that a user unsubscribed from that group they would lose access to those messages.
        
        
* Known Bugs:
    * 
