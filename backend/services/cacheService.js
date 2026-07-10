import {redisClient} from "../config/redis.js"
export const getCache=async(key)=>{
      const data=await redisClient.get(key);
      return data?JSON.parse(data):null;
}

export const setCache=async(key,Value,ttl=60)=>{
    await redisClient.setEx(
        key,
        ttl,
        JSON.stringify(Value)
    );
};

export const deleteCache=async(...keys)=>{
    if(keys.length>0){
        await redisClient.del(keys);
    }
}