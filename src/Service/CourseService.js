
const url= "https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/course"
const addUrl = "https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/addcourse"
const deleteUrl= "https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/delcourse"
const searchUrl= "https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/search"

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

    findByCourseName(coursetitle) {


        var course= {title: coursetitle}

        return fetch(searchUrl,
            {
                body: JSON.stringify(course),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        ).then(function (response) {
            return response.json();
        })

    }



    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }



}


export default CourseService;