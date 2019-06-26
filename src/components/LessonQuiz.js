//react
import React, { useState, useEffect } from 'react';
//router
import { } from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getCourseId, getLesson, getLessonId } from '../redux/selectors';
import { updateUser, calculateQuiz } from '../redux/actions';
//react-bootstrap
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
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

        await dispatch(updateUser({
            courses: {
                ...user.courses,
                [courseId]: {
                    ...user.courses[courseId],
                    lessons: {
                        [lessonId]: {
                            ...user.courses[courseId].lessons[lessonId],
                            answers
                        }
                    }
                }
            }
        }));

        await dispatch(calculateQuiz(courseId, lessonId));
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

    const getScoreBadge = () => {
        let score = 0;
        const total = questions.length;

        try {
            score = user.courses[courseId].lessons[lessonId].score || 0;
        } catch (err) { }

        const variant = score === total ? "success" : "secondary";

        return (
            <Badge pill variant={variant}>{`${score} of ${total} correct`}</Badge>
        );
    };

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
        <Card border="secondary" className="mb-4">
            <Card.Header>Quiz</Card.Header>
            <Card.Body>
                <Form>
                    {quizQuestions}
                </Form>
                <Button variant="primary" onClick={handleUpdateUser}>Submit</Button>
            </Card.Body>
            <Card.Footer>
                {getScoreBadge()}
            </Card.Footer>
        </Card>
    );
}