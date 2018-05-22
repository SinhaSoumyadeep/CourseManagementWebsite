
const url= "http://localhost:8080/api/course"
const addUrl = "http://localhost:8080/api/addcourse"
const deleteUrl= "http://localhost:8080/api/delcourse"

let _singleton = Symbol();


class CourseService {




    findAllCourses() {
        return fetch(url).then(function(response) {return response.json()})
    }


    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }


    createCourse(course) {
        return fetch(addUrl, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseid) {
        return fetch(deleteUrl,
                {
                    body: JSON.stringify({id: courseid}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            ).then(function (response) {
            return response;
        })

    }



    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }



}


export default CourseService;