import {createClient} from "redis";
const redisClient=createClient({
    url:process.env.REDIS_URI,
});
redisClient.on("error",(err)=>{
    console.log("Redis Error",err.message);
});

const connectRedis=async()=>{
    try{
        await redisClient.connect();
        console.log("Redis connected SuccedFully");
    }
    catch(error){
        console.log("Redis connection Failed");
        console.log(error.message);
    }
};
export {redisClient,connectRedis};