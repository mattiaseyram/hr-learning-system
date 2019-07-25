# HR-LEARNING-SYSTEM

## Scripts
In the project directory, you can run:

### `npm start`

- runs the app in development mode at <http://localhost:3000>

### `npm run build` 

- builds the production app in the `build` folder

### `npm run functions` 

 - runs the cloud functions in emulator mode locally with hot reloading
(set `local = true` in `/src/utils/firebase.js` first to connect the local React app)

### `npm run deploy`

- runs npm run build then deploys all code to Firebase

## Setup

1. Clone the repository into your projects folder
2. Run `firebase login` to sign in to the firebase console as a developer
3. Copy the Service Account JSON key into `./serviceAccountKey.json`

## Development

### Local React Development connected to Hosted Cloud Functions

- `npm run start`

### Local React Development connected to Local Emulated Cloud Functions

- `npm run functions`
- set `local = true` in `/src/utils/firebase.js`
- `npm start` in separate terminal

## Folder Overview

### `/src`

* Contains the React codebase initialized from Create-React-App
* Using root folder `/public`, builds with Webpack to root folder `/build` which is deployed to Firebase

### `/functions`

* Contains the Firebase Google Cloud Functions codebase
* Has a separate set of `/node_modules` and `package.json` file from React

<br><br><br><br><br><br>

## Default CRA Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

<br><br><br><br><br><br>

# Feature Documentation

<!----- Conversion time: 7.869 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β17
* Thu Jul 25 2019 08:25:31 GMT-0700 (PDT)
* Source doc: https://docs.google.com/open?id=1uSvUuXsoFvPZQ370_Crd0wQ85ciXP5-3qi-SedIK4NY
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server.
----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 3.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



## Software Architecture Document - HR Learning System


### 1. Introduction


#### 1.1 Purpose 

This document provides a comprehensive architectural overview of the system, using a number of different architectural views to depict different aspects of the system. It is intended to capture and convey the significant architectural decisions which have been made on the system.


#### 1.2 Scope 

This Software Architecture Document provides an architectural overview of the HR Learning System. The HR Learning System is being developed by the Canadian Fundraising Corporation to dispense knowledge among employees through the coordination of required and optional training materials to achieve the mission of  being “the most reputable fundraising consulting company”.


#### 1.3 Definitions, Acronyms and Abbreviations



*   CFC - Canadian Fundraising Corporation (a.k.a. the firm, organization, company)
*   Docket - Unique user view for a user’s active courses.
*   HRLS - HR Learning System


### 2. Architectural Representation

This document presents the architecture as a series of views; use case view, logical view, process view and deployment view. There is no separate implementation view described in this document. These are views on an underlying Unified Modeling Language (UML) model.


### 3. Architectural Goals and Constraints

The HR Learning System will:



*   Onboard new staff quickly to the CFC’s practices and guidelines, as well as, any role-specific knowledge.
*   Foster continuous learning culture by allowing employees to self-enroll into courses, track their progress, and earn completion certificates.
*   Allow management to elevate their team by assigning training either as part of continuous improvement or for a promotion track.
*   Ensure CFC consultants are well-prepared on ever-changing charitable causes by having instructional courses on these topics.
*   Ensure only HR admin staff can create new courses.
*   Completion rate of courses can only be viewable by an employee’s manager and HR staff.
*   HR Learning system can only be accessed by CFC staff, and administered by the HR team.
*   HR data may not be accessible outside of CFC.


### 4. Use-Case View 

The primary use cases include:



*   Login
*   Onboarding
*   Course Enrollment
*   Course Progress Tracking
*   Team Learning Management
*   HR Learning Reports

The following are preliminary User Stories for the HR Learning System:


<table>
  <tr>
   <td>Identifier
   </td>
   <td>User Story
   </td>
  </tr>
  <tr>
   <td>HRU-001
   </td>
   <td>As a new employee, I want an onboarding package added to your course pack on the HR learning system based on my role so that I can learn about the company and role-specific items.
   </td>
  </tr>
  <tr>
   <td>HRU-002
   </td>
   <td>As a user, I want to be able to search for courses/training so that I can find courses relevant for a specific role or function.
   </td>
  </tr>
  <tr>
   <td>HRU-003
   </td>
   <td>As a user, I want to add courses to my docket so that I can support my continuous learning.
   </td>
  </tr>
  <tr>
   <td>HRU-004
   </td>
   <td>As a user, I want to view my ongoing and completed courses so that I can check progress and return to previous completed courses.
   </td>
  </tr>
  <tr>
   <td>HRU-005
   </td>
   <td>As a user, I want to sort my courses by mandatory/optional and % complete so that I can prioritize my training docket.
   </td>
  </tr>
  <tr>
   <td>HRU-006
   </td>
   <td>As a user, I want to be notified for an uncompleted course when a deadline is approaching so that I can complete the course in time.
   </td>
  </tr>
  <tr>
   <td>TM-001
   </td>
   <td>As a manager, I want to access my team’s course docket so that I can see their completed courses.
   </td>
  </tr>
  <tr>
   <td>TM-002
   </td>
   <td>As a manager, I want to search and assign mandatory courses to my team members so that they can complete required training.
   </td>
  </tr>
  <tr>
   <td>HRM-001
   </td>
   <td>As an HR manager, I want to view metrics for each course so that I can create reports of the company’s learning system use.
   </td>
  </tr>
  <tr>
   <td>HRM-002
   </td>
   <td>As an HR manager, I want to view the aggregated quiz scores for a course per question so that I can determine if some questions are too difficult or easy.
   </td>
  </tr>
  <tr>
   <td>HRM-003
   </td>
   <td>As an HR manager, I want to view all the users taken(ing) a particular course so that I can send reminder emails.
   </td>
  </tr>
  <tr>
   <td>HRM-004
   </td>
   <td>As an HR manager, I want to view the docket of any user so that I can ping them for mandatory courses.
   </td>
  </tr>
  <tr>
   <td>HRM-005
   </td>
   <td>As an HR manager, I want to be able to mass assign courses by role so that they can all complete their required training.
   </td>
  </tr>
  <tr>
   <td>HRA-001
   </td>
   <td>As an HR Admin, I want to be able to create courses so that they can be added to the system.
   </td>
  </tr>
  <tr>
   <td>HRA-002
   </td>
   <td>As an HR Admin, I want to create quizzes in courses so that I can assess whether the user can actually learnt the content.
   </td>
  </tr>
</table>



#### 4.1 Architecturally-Significant Use Cases



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/System-Architecture0.jpg). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/System-Architecture0.jpg "image_tooltip")


Diagram Name: Architecturally Significant Use-Cases


##### 4.1.1 Login



*   CFC employees can access the system using their regular CFC credentials.


##### 4.1.2 Onboarding



*   A new CFC employee automatically gets an onboarding package added to their docket; the general docket teaches them the basics of CFC’s practices and policies.
*   The onboarding package also include role-specific learning packages (i.e. consultants get topics on using the CRM, approaching charities the “CFC way”, etc).
*   The onboarding package has a two week deadline set from day of joining.


##### 4.1.3 Course Enrollment



*   Users can search for available courses by keywords and user-role filters.
*   Users can self-enroll into available courses, which adds the course to their docket.


##### 4.1.4 Course Progress Tracking



*   Users can retrieve their completed course certificates.
*   Users can return to courses in their docket currently in progress but not yet complete.
*   Users can sort by approaching deadline, topic, role, progress, and title of the course.


##### 4.1.5 Team Learning Management



*   A manager of a team can search for courses on behalf of their team members.
*   A manager can enroll members of their team to courses and set their deadlines.
*   A manager can review progress and completion certificates of all courses for users on their team.


##### 4.1.6 HR Learning Reports



*   An HR Admin can create courses and quizzes and add them to HRLS.
*   An HR Admin can update existing courses on HRLS.
*   An HR User can review aggregate metrics by course and by user.
    *   # of CFC employees completed/enrolled for course
    *   # courses on HRLS
*   An HR User can mass-assign (by user multi-select, or by role) courses with a specific deadline.
*   An HR User can ping (email notification) users that are approaching their deadlines for a specific course or are already past deadline.
*   An HR users can review aggregate quiz score for a specific course for possible refactoring (e.g. quiz is too hard/easy for the learning topic).


### 5. Logical View 


#### 5.1 Architecture Overview - Package and Subsystem Layering


<table>
  <tr>
   <td><strong>Layer</strong>
   </td>
   <td><strong>Application</strong>
   </td>
  </tr>
  <tr>
   <td>Connection
   </td>
   <td>REST Requests
   </td>
  </tr>
  <tr>
   <td><strong>Layer</strong>
   </td>
   <td><strong>API Service</strong>
   </td>
  </tr>
  <tr>
   <td>Connection
   </td>
   <td>API (JS library)
   </td>
  </tr>
  <tr>
   <td><strong>Layer</strong>
   </td>
   <td><strong>Middleware</strong>
   </td>
  </tr>
</table>


**Application**


    Layer


    The Application Layer will be built with the React front-end library and hosted on Netlify. It provides the various users with all of their views inside the web browser, and connects to the API service through REST requests.

**Business Services**


    Layer


    The Business Services layer (built with Google Cloud Functions in Firebase) is accessible through defined endpoints.

**Middleware**


    Layer


    The Middleware layer is provided by the Cloud Firestore in the form of



*   Rules (which define and enforce proper NoSQL database schema, as well as user permissions in terms of viewing or editing data)
*   Admin SDK (which provides an interface for the server and/or front-end application to interact with the database)




#### 5.2 Database Schema Overview


    The NoSQL Cloud Firestore database schema is defined as per below.  


    Three major collections will be utilized to store the data necessary to support the application; users, courses, and lessons.


```
{ /* top level keys are collections */

/*user collection*/
   "users": { 
       "user1": {
           "id": 1 /*INT*/,
           "first_name": "" /*STRING*/,
           "last_name": "" /*STRING*/,
           "create_time": "" /*DATETIME*/,
           "last_login": "" /*DATETIME*/,
           "roles": [] /*ENUM[]*/,
           "manages": [] /*USERID[]*/,
           "courses": {
               "course1": {
                   "id": 1 /*INT*/,
                   "course": 1 /*ID*/,
                   "mandatory": true /*BOOL*/,
                   "deadline": "" /*DATETIME*/,
                   "lessons": {
                       "lesson1": {
                           "id": 1 /*INT*/,
                           "lesson_id": 1 /*INT*/,
                           "complete": 0 /*INT*/,
                           "total": 5 /*INT*/,
                           "answers": [] /*STRING[]*/
                       }
                   }
               }
           }
       }
   },

/* continued on next page */

/*course collection*/  
 "courses": { 
       "course1": {
           "id": 1 /*INT*/,
           "title": "" /*STRING*/,
           "description": "" /*STRING*/,
           "created_date": "" /*DATETIME*/,
           "last_modified_date": "" /*DATETIME*/,
           "lessons": [] /*LESSONID*/,
           "mandatory": true /*BOOL*/,
       }
   },

 /*lesson collection*/
   "lessons": {
       "lesson1": {
           "id": 1 /*INT*/,
           "title": "" /*STRING*/,
           "content": "" /*STRING*/,
           "quiz": {
               "questions": [
                   {
                       "question": "" /*STRING*/,
                       "answer": "" /*STRING*/,
                       "options": [] /* STRING[] */
                   }
               ]
           }
       }
   }
}
```



#### 


#### 6. Process View


#### 6.1 Controllers

**UserController**


    addCourses(id: id, courseIds: id[])


    addCourse(id: id, courseId: id)


    dropCourses(id: id, courseIds: id[])


    dropCourse(id: id, courseId: id)


    getCourses()


    getCourses(id: id)


    getCourse(courseId: id)


    attemptLesson(lessonId: id, answers: String[])


    addSubordinate(id: id)


    addSubordinates(ids: id[])


    getRole()


    login(username: String, password: String)


    logout()


    createUser(contents: JSON)


    getUsers()


    getUsers(id)


    getUser(id: id)


    updateUser(id: id, contents: JSON)


    deleteUser(id: id)


    notifyUser(id: id, message: String)


    This controller supports general CRUD operations on the User entity (for the given user and for their manager), as well as methods for retrieving user-related information like enrolled courses, and methods for notifying (pinging) the said user.

**CourseController**


    createCourse(contents: JSON)


    getCourses()


    getCourse(id: id)


    updateCourse(id: id, contents: JSON)


    deleteCourse(id: id)


    This controller supports general CRUD operations on the Course entity, which are assigned to the user in the UserController.

**LessonController**

createLesson(courseId: id, contents: JSON)

getLessons()

getLessons(courseId: id)

getLesson(id: id)

updateLesson(id: id, contents: JSON)

deleteLesson(id: id)


    This controller supports general CRUD operations on the Lesson entity, as well as the ability to retrieve lessons related to a course.


#### 6.2 Processes

**Application**

**LoginProcess**


    This encompasses the user login (standard user as well as managers).


    Methods Used



*   User.login()
*   User.getRole()

**ManagerCourseRegistrationProcess**


    This allows managers to enroll their subordinates into courses available in the system


    Methods Used



*   User.addCourses(id, courseIds)
*   User.addCourse(id, courseId)
*   User.removeCourses(id, courseIds)
*   User.removeCourse(id, courseId)
*   User.getCourses(id)
*   Courses.getCourses()

**UserCourseRegistrationProcess**


    This allows standard users to enroll themselves in courses available in the system


    Methods Used



*   User.addCourses(id, courseIds)
*   User.addCourse(id, courseId)
*   User.removeCourses(id, courseIds)
*   User.removeCourse(id, courseId)
*   User.getCourses()
*   Courses.getCourses()

**CourseCreationProcess**


    This allows managers and HR admins to create courses as well as their corresponding lessons and lesson quizzes


    Methods Used



*   Course.createCourse(id, content)
*   Course.updateCourse(id, content)
*   Course.deleteCourse(id)
*   Course.getCourses()
*   Lesson.createLesson(id, content)
*   Lesson.updateLesson(id, content)
*   Lesson.deleteLesson(id)
*   Lesson.getLessons()
*   Lesson.getLessons(courseId)

**AdminMetricsProcess**


    This allows HR admins to view course metrics


    Methods



*   User.getUsers()
*   User.getCourses(id)
*   Courses.getCourses()
*   Lessons.getLessons(courseId)

**ManagerMetricsProcess**


    This allows managers to view subordinate metrics


    Methods



*   User.getUsers(managerId)
*   User.getCourses(id)
*   Courses.getCourses()
*   Lessons.getLessons(courseId)

**UserMetricsProcess**


    This allows standard users to view their completion metrics on the courses they have taken


    Methods



*   User.getUser(id)
*   User.getCourses(id)
*   Courses.getCourses()
*   Lessons.getLessons(courseId)

**UserLessonProcess**


    This allows users to view a lesson they are enrolled in, as well as attempt a quiz tied to that lesson.


    Methods



*   User.getLesson(id)
*   User.attemptLesson(lessonId, answers)
*   Lesson.getLesson(id)


#### 6.3 Views

**LoginView**


    Allows user to input username and password to login.

**CoursesView**


    Allows the user to view the courses and lesson descriptions they are enrolled in, and select a lesson.

**UserCourseRegistrationView**


    Allows the user to self-register in available courses.

**ManagerCourseRegistrationView**


    Allows a manager to register their subordinates in available courses.

**CourseCreationView**


    Allows an admin to view all available courses and lessons, and displays a text editor and quiz editor to create lessons and corresponding quizzes.

**UserMetricsView**


    Displays the course and lesson completion metrics for a given user (the logged in user or selected user).

**ManagerMetricsView**


    Displays an overview of completion metric of  a manager’s subordinates.

**AdminMetricsView**


    Displays metrics by courses for an admin.


#### 6.4 Processes to Design Elements



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/System-Architecture1.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/System-Architecture1.png "image_tooltip")



### 7. Deployment View 

Users interact with the application through a React web application. All of the server logic such as routing and the transformation of data is handled through Google Cloud functions which interact with a Google Firestore for persistent data (nosql-type database).

This serverless approach was selected for two main reasons. First since CFC is a consulting company, the size of their work force grows and shrinks depending on the projects at hand. As such, the organization should not have to pay for hosting architecture that can handle peak usage when the platform is experiencing little use. The serverless architecture seamlessly scales up when use is high and scales back down when usage is low.  Furthermore, CFC will only need to pay on each call of the function as opposed to pay a monthly fixed fee if the service is not being used. The second is ease of development and maintainability. The cloud architecture allows any new developers that are being onboarded onto the system to quickly become development ready, without any need for tedious development environment set-up. While tools like Docker do exist to overcome such problems, these tools still have a learning curve, thus a serverless architecture was chosen. 

The React frontend will be hosted on some hosting service such as AWS when in production. But for our prototype it will be hosted on Firebase as well. 

There is no anticipated challenges in terms of size and performance. The number of users and courses can easily be scaled to suit a small or large organization due to the technology used for implementation. 



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/System-Architecture2.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/System-Architecture2.png "image_tooltip")



### 9. Quality 

The HRLS will be assessed using:



*   Full functionality of Chrome Web Browser
*   Decrease in time to complete required training for all employee
*   Percentage of employees with all required training complete
*   Number of optional trainings completed by employee
*   Number of optional courses available

<!-- Docs to Markdown version 1.0β17 -->
