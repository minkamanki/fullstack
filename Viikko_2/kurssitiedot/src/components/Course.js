import React from 'react'

const CourseHeader = (props) => {
    return (
        <h2>
            {props.course}
        </h2>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    return (
        <b>total of {props.parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0)}  exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <CourseHeader course={course.name} />
        {course.parts.map(part => <Part part={part} />)}
        <Total parts={course.parts} />
    </div>
    )
}

export default Course