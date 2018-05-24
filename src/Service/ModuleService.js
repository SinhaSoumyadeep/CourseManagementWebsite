let _singleton = Symbol();
const MODULE_API_URL = 'https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/course/CID/module';
const deleteUrl = 'https://webdev-summer1-2018-sinha-sou.herokuapp.com/api/module/MID';


export default class ModuleService {



    findAllModulesForCourse(courseId)
    {

        return fetch(MODULE_API_URL.replace('CID', courseId)).then(function(response) {return response.json()})

    }


    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {   body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }


    deleteCourse(moduleid) {

        return fetch(deleteUrl.replace('MID', moduleid),
            {
                body: JSON.stringify({id: moduleid}),
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
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }


}
