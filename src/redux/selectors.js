//user
export const getUser = store => store.user.user;
export const getUsers = store => store.user.users;
//ui
export const getLoading = store => store.ui.loading;
export const getWarning = store => store.ui.warning;
export const getTitle = store => store.ui.title;
//course
export const getCourse = store => store.course.course;
export const getCourseId = store => store.course.id;
export const getCourses = store => store.course.courses;
//lesson
export const getLesson = store => store.lesson.lesson;
export const getLessonId = store => store.lesson.id;
export const getLessons = store => store.lesson.lessons;