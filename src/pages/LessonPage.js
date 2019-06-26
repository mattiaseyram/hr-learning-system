//react
import React, { useEffect, useState } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getLesson, getUser, getCourse } from '../redux/selectors';
import { fetchCourse, fetchLesson, updateUser } from '../redux/actions';
//react-markdown
import ReactMarkdown from 'react-markdown';
//react-bootstrap
import { JumboCard, Form } from 'react-bootstrap'
//components
import Page from '../components/Page';
import JumboCard from '../components/JumboCard';

export default function LessonPage({ match: { params } }) {

    const dispatch = useDispatch();

    const course = useSelector(getCourse) || {};
    // storage of quiz answers
    const quiz_ans = [];

    const course = useSelector(getCourse) || {};
    const lesson = useSelector(getLesson) || {};

    console.log(course, lesson);
    const user = useSelector(getUser);

    useEffect(() => { dispatch(fetchCourse(params.courseId)) }, [dispatch, params.courseId]);
    useEffect(() => { dispatch(fetchLesson(params.lessonId)) }, [dispatch, params.lessonId]);

   
    const [userState, setUserState] = useState(user);
    const handleUpdateUser = () => dispatch(updateUser(userState));

    // quiz form handler for submit
    const handleSubmit = event => {
        console.log(quiz_ans)
        // TODO call backend function (lesson[answers] = quiz_ans)
        //setUserState({...userState, courses : ???})
        console.log(`lessonId: ${lessonId}`)
        //console.log(`currentAnswers: ${currentAnswers}`)
        console.log(user)
        //handleUpdateUser();
        event.preventDefault();
        event.stopPropagation();
    }

    // handles input changes in the form
    //  e.target.name == quiz #
    //  e.target.id == value for answer in quiz #
    const handleChange = e => {
        quiz_ans[parseInt(e.target.name)] = e.target.id
    }

    // quizzes
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

    return (
        <Page title={lesson.title}>
            <JumboCard>
                <h1>{lesson.title}</h1>
            </JumboCard>
            <JumboCard border="secondary">
                <ReactMarkdown source={lesson.content}/>
            </JumboCard>
            if (quizzes) {
                <JumboCard border="secondary">
                    <h2>Quiz</h2>
                    <Form onSubmit={handleSubmit}>
                        {quizzes}
                        <input type="submit" value="Submit" />
                    </Form>
                </JumboCard> 
            }
        </Page>
    );
};
