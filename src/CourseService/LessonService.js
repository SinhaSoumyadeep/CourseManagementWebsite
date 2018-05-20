let _singleton = Symbol();
const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module/MID';



export default class LessonService {



    findAllLessonsForModule(courseId, moduleId)
    {

       var fetchLessonUrl =  MODULE_API_URL.replace('CID',courseId).replace('MID',moduleId);

        return fetch(fetchLessonUrl).then(function(response) {return response.json()})



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
