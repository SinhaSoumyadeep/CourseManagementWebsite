let _singleton = Symbol();
const MODULE_API_URL = 'http://localhost:8080/api/lesson/LID';
const deleteUrl = 'http://localhost:8080/api/topic/TID';




export default class TopicService {



    findAllTopicsForLessons(lessonId)
    {

        var fetchTopicUrl =  MODULE_API_URL.replace('LID',lessonId);

        return fetch(fetchTopicUrl).then(function(response) {return response.json()})



    }

    createTopicForLesson(lessonId, topic) {

        var fetchTopicUrl =  MODULE_API_URL.replace('LID',lessonId);
        return fetch(fetchTopicUrl,
            {   body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }


    deleteTopic(topicid) {

        return fetch(deleteUrl.replace('TID', topicid),
            {
                body: JSON.stringify({id: topicid}),
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
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }


}
