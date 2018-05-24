let _singleton = Symbol();
const MODULE_API_URL = 'https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/course/CID/module/MID';
const deleteUrl = 'https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/lesson/LID';



export default class LessonService {



    findAllLessonsForModule(courseId, moduleId)
    {

       var fetchLessonUrl =  MODULE_API_URL.replace('CID',courseId).replace('MID',moduleId);

        return fetch(fetchLessonUrl).then(function(response) {return response.json()})



    }

    createLessonForModule(courseId, moduleId, lesson) {

        var fetchLessonUrl =  MODULE_API_URL.replace('CID',courseId).replace('MID',moduleId);
        return fetch(fetchLessonUrl,
            {   body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonid) {

        return fetch(deleteUrl.replace('LID', lessonid),
            {
                body: JSON.stringify({id: lessonid}),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
        )

    }




    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }


    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }


}
