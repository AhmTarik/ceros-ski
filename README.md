# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!


* **Ski challenge Url:**
My play version  is : http://ceros-ski-a.tarik.s3-website-us-east-1.amazonaws.com/

* **Checklist:**
* :white_check_mark: fixing the bug
* :white_check_mark: skier can jump by key
* :white_check_mark: skier can jump by ramp
* :white_check_mark: skier can jump over rock
* :white_check_mark: skier can't jump over tree
* :white_check_mark: rhino show after skier ski for too long
* :white_check_mark: rhino show after certain time 
* :white_check_mark: rhino catch the skier
* :white_check_mark: rhino eat the skier
* :white_check_mark: reset game once it's over
* :white_check_mark: pause and resume the game
* :white_check_mark: add dashboard sor score,speed and game status
* :white_check_mark: increase skier speed
* :x: ncrease obstacle frequency
* :white_check_mark: Deploy game on s3 


* **Comments:**
1. Create "fixbug-left-arrow-white-screen" branch, then check incoming direction inside onSetDirection function already existed in Skier direction assets.
2. Add unit test cases for testing the bug and make sure it will not happen again
3. Create "allow-jumping" branch add space-bar  as a new key in controls object and linked handle click of space inside skier class.
4. Start draw juming ramp by added in assets object in "Constants.js" file and added as new asset type in "Obstacle.js" file.
5. Add isJumping prop by: 
      -  Start add some assets for jumping feature like (name,image url and jumping time).
      -  Add "isJumping" property inside skier class.
      -  Allow skier to finished jump by using timeout fn.  
6. Change Skier Condition only if direction equal to down, left-down or right down.
7. Update Skier asset name when any change happen to "isJumping" value.
8. Start allow skier to jump over obstacles
      - Create OBSTACLE_COLLISION_ASSET in "Constants.js", that contain all obstacles in ski-game with defined if it allow skier to        stepover or can jump.
      - inside checkIfSkierHitObstacle() function on "Skier.js" add extra conditions if collision happen like  make skier jump over obstcale  or can help skier to jump.
9. Create "rhino-beast" branch.
      -  create "Rhino.js" class that extend entity class.
      -  define some new assets for rhino to allow draw it in "Constants.js" file.
      -  create timeout in rhino constructor to allow it to catch the skier by set "cancatch" to true.
      -  try to animate rhino movement inside move() fn, By make space between it and the skier and  canCatch flag is active
          then decrease the space every time  when draw it to reach zero(skier and rhino in same location).
      -  allow draw rhino if only canCatch flag is active
10. Add pause/resume feature by using events
      -  trigger event when game pause or resume to help other objects later.
      -  stop game inside in run() fn "Gamer.js"
11. From point 10 and later start send/recieve date between classes using events easy on( modification,reading code and scalability)
12. Start animate rhino eat the skier
      -  create some assets
      -  create timeintervalto change rhino direction every 250mSec
      -  notify "game is over" event
      -  skier stopped  on listening to event "game is over" 
      -  game restart on  game class listening to event "game is over"
13. Idle any timeout when game paused
      - create "Timer.js" class with 3 methods (create,cancel and resume) timeout.
      - link skier and rhino with this class 
      - example like skier jumping for 1.5Sec, rhino countdown timer to start catch the skier
14. Add bounus features
      - create Distance class to be responsible for check skier moved and distance covered and trigger event if value changed.
      - create Dashboard class to be responsible for displaying game status,score and skier speed when any change happen.
      - in skier class notify about the position.
      - in rhino start catch the skier if countdown timer start when skier moved or skier cut defined distance covered.
      - by listen to "SkierMoved" and "SKIER_DISTANCE_COVERED".
      - add increase speed feature for skier and when speed increase trigger event "SKIER_CURRENT_SPEED".


  

