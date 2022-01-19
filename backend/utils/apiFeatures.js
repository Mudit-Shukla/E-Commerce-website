class ApiFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name : {
                $regex : this.queryString.keyword,
                $options : "i",
            }
        } : {

        };

        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const copiedQuery = {...this.queryString};
        const wordToBeRemoved = ["keyword"];
        wordToBeRemoved.forEach((key) => delete copiedQuery[key]);
        this.query = this.query.find(copiedQuery);
        return this;
    }
};

module.exports = ApiFeatures;