class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    //search product by name
    search(){
        const keyword=this.queryStr.keyword
        ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }
        }
        :{};

        this.query=this.query.find({...keyword});
        return this;
    }


     //filter products
     filter(){
        const queryCopy={...this.queryStr};

        //remove fields fro category filtering
        const removeFeilds=['keyword','page','limit'];
        removeFeilds.forEach((key)=>delete queryCopy[key]);


        //filter for price,rating etc
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        this.query=this.query.find(JSON.parse(queryStr));
        return this;
     }

     //pagination
     pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
     }
}

module.exports=APIFeatures;