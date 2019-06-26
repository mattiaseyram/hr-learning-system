//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getCourseId, getLesson, getLessonId } from '../redux/selectors';
import { updateUser } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function LessonQuiz() {

    const dispatch = useDispatch();

    const user = useSelector(getUser);
    const courseId = useSelector(getCourseId);
    const lesson = useSelector(getLesson);
    const lessonId = useSelector(getLessonId);

    const questions = lesson ? lesson.questions : [];

    const [answers, setAnswers] = useState(new Array(questions.length).fill(''));

    const setAnswer = (value, i) => {
        let newAnswers = [...answers];
        newAnswers[i] = value;
        setAnswers(newAnswers);
    };

    const handleUpdateUser = async () => {
        let updatedCourses = JSON.parse(JSON.stringify(user.courses)); //deep copy user.courses to prevent errors
        updatedCourses[courseId].lessons[lessonId].answers = answers;

        await dispatch(updateUser({
            courses: updatedCourses
        }));
    };

    //create quiz questions elements
    const quizQuestions = questions
        .map((question, i) => {

            const selectItems = question.options.map((optionString, i2) => (
                <option key={i2}>{optionString}</option>
            ));

            return (
                <Form.Group key={i}>
                    <Form.Label>{question.question}</Form.Label>
                    <Form.Control as="select"
                        onChange={event => setAnswer(event.target.value, i)}
                        value={answers[i]}>
                        <option>{''}</option>
                        {selectItems}
                    </Form.Control>
                </Form.Group>
            );
        });

    //set user answers on init
    useEffect(() => {
        try {
            const userAnswers = user.courses[courseId].lessons[lessonId].answers;
            if (userAnswers.length === answers.length) {
                return setAnswers([...userAnswers]);
            }
        } catch (err) { }
    }, [user, courseId, lessonId, lesson, answers.length]);

    return (
        <Card border="secondary">
            <Card.Header>Quiz</Card.Header>
            <Card.Body>
                <Form>
                    {quizQuestions}
                </Form>
                <Button variant="primary" onClick={handleUpdateUser}>Submit</Button>

            </Card.Body>
        </Card>
    );
}