//react
import React, { useEffect, useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson, getUser } from '../redux/selectors';
import { fetchLesson, updateUser } from '../redux/actions';
//react-markdown
import ReactMarkdown from 'react-markdown';
//react-bootstrap
import Form from 'react-bootstrap/Form'
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard'

export default function LessonPage({ match: { params } }) {

    const dispatch = useDispatch();

    // storage of quiz answers
    const quiz_ans = [];

    const lesson = useSelector(getLesson) || {};
    const user = useSelector(getUser);

    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

   
    const [userState, setUserState] = useState(user);
    const handleUpdateUser = () => dispatch(updateUser(userState));

    // quiz form handler for submit
    const handleSubmit = event => {
        // get current user's answers (before actual submit)
        const user_ans = (user.courses ? (
            user.courses[params.courseId] ? (
                user.courses[params.courseId].lessons[params.lessonId] ? user.courses[params.courseId].lessons[params.lessonId].answers : null) : null) : null);
        // DEBUG track quiz answers
        console.log(`current quiz ans: ${quiz_ans}`)
        console.log(`user quiz ans: ${user_ans}`)
        // nested object state update
        setUserState(userState => ({
            ...userState,
            courses: {
                ...userState.courses,
                [params.courseId]: {
                    ...userState.courses[params.courseId],
                    lessons: {
                        ...userState.courses[params.courseId].lessons,
                        [params.lessonId]: {
                            ...userState.courses[params.courseId].lessons[params.lessonId],
                            answers: quiz_ans
                        }
                    }
                }
            }
        }))
        // DEBUG check state updated
        console.log(user.courses[params.courseId].lessons[params.lessonId].answers)
        console.log(userState.courses[params.courseId].lessons[params.lessonId].answers)
        console.log(userState.courses[params.courseId])
        handleUpdateUser();
        event.preventDefault();
        event.stopPropagation();
    }

    // handles input changes in the form
    //  e.target.name == quiz #
    //  e.target.id == value for answer in quiz #
    const handleChange = e => {
        quiz_ans[parseInt(e.target.name)] = e.target.id
    }

    // quizzes form
    const quizzes = (lesson.questions ?
        lesson.questions.map((quiz, i) => {
            return (
                <div>
                    <h4>{quiz.question}</h4>
                        <Form.Group>
                            {quiz.options.map(ans => (
                                <Form.Check
                                type="radio"
                                label={ans}
                                name={`${i}`}
                                id={ans}
                                onChange={handleChange}
                            />
                            ))}
                        </Form.Group>
                </div>
            )
        }) : null);
    
    // JSX doesn't support if-else operators, have to do this externally.
    var quiz_frag;
    if (quizzes) {
        quiz_frag =
        <JumboCard border="secondary">
            <h2>Quiz</h2>
            <Form onSubmit={handleSubmit}>
                {quizzes}
                <input type="submit" value="Submit" />
            </Form>
        </JumboCard>
    } else {
        quiz_frag = null;
    }

    return (
        <Page title={lesson.title}>
            <JumboCard>
                <h1>{lesson.title}</h1>
            </JumboCard>
            <JumboCard border="secondary">
                <ReactMarkdown source={lesson.content} />
            </JumboCard>
            {quiz_frag}
        </Page>
    );
};
