# CompanyBlog
This is a mock internal blog for a company to use to allow employees to interact in a blog setting internally using GitHub OAuth

*** Please note: Cookies must be enabled for this site to operate correctly.

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
        * Right now you can post to any group but not become subscribed to a group. That implementation is still in the works.
       
    * A user should be able to make a post in markdown and syntax should be supported.  
        * I implemented a solution using an npm package called angular2-markdown. It is an angular tag that can be used to render markdown.
    * A user should be able to view who has read their post.
        * I was using Materialize chips to show a list of chips which were avatar pictures with user names, and set up logic so that this is only seen by the user who is logged in on messages he/she creates.  Unfortunately, a last minute side effect prevented that from working. 
    * A user should be able to mark a post as read.
        * Not currently implemented, but I would like to add in functionality that if you click the new button on an unread item, it should mark it as read.
    * Create group notifications that notify group members at the time of when the message was sent.
        * My current implementation does not support this.  My groups will be based off subscriptions, so if a message was sent to a group and then after that a user unsubscribed from that group they would lose access to those messages.
        
        
* IF I HAD MORE TIME:
    * Messages in the main window are supposed to be filtered to be only the new messages. I was having trouble with my flow of logic and that did not end up being implemented.  The collapsibles on the left sidebar would contain all messages available to our user, using the small new badges to show any that were unread.  This is simply hard coded, but once the logic worked to only show the unread messages I was going to bind to that length of that array therefore showing in the sidebar which number of messages for each category are unread.
    
    * Messages clicked in the main section when clicked bring up a modal which supports markdown rendering. (Weird bug the first time you click it you have to click it twice).  I did not have time to implement the same for in the sidebar. In a future release I would have the side bar clicks also open that message in the same modal. Also the modal itself is overly basic. I thought I would have made it farther and wanted to style that up and make it a little more logical.
  
    * New button:  New tag on the unread items help to indicate that they are unread.  If I had additional time, I wanted to set it up so that when clicked it would mark that post read by the user and then re-render the component. 
    
    * Notifications:  My planned method of notification was the badges on the left that alert you of unread messages. I originally thought of using something like Node Mailer or Twilio when I thought of notifications, but I personally don't think either of those ideas scale efficiently as they are very expensive. So my route was to have the unread number badges int he sidebar and then I was also exploring setting up a timer so that every 3-4 minutes if no movement has been detected it would refresh the page. If in fact there were new messages at that point I was going to create a blinker for the tab which would further notify the user "look here".
    
* Testing:  
    * I wanted to use Jasmine but was unfamiliar with it and did not have time to learn it, with a crunch on time, I only ended up writing a few logic tests using Mocha and the chai assertion library.  These were simply testing logic.  
