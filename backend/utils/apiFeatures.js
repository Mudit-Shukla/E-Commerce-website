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
        const wordToBeRemoved = ["keyword", "limit", "page"];
        wordToBeRemoved.forEach((key) => delete copiedQuery[key]);

        // filter for price range and rating  //

        // console.log(copiedQuery);

        let queryString = JSON.stringify(copiedQuery);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // console.log(queryString);

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resultsPerPage){
        const currentPage = Number (this.queryString.page) || 1;
        const skipNumberOfProducts = resultsPerPage * (currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skipNumberOfProducts);
        return this;
    }
};

module.exports = ApiFeatures;