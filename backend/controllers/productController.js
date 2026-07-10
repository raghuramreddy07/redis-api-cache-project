import Product from "../models/product.js"
import {setCache,getCache,deleteCache} from "../services/cacheService.js"
import { CACHE_KEYS } from "../utils/cacheKeys.js";
export const createProduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body);
        await deleteCache(CACHE_KEYS.PRODUCTS)
        res.status(201).json({
            success:true,
            data:product
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getAllProducts=async(req,res)=>{
    try{
        const cachedProducts=await getCache(CACHE_KEYS.PRODUCTS)
        if(cachedProducts){
            console.log("✅ Cache Hit");
            return res.status(200).json({
                success:true,
                source:"Redis Cache",
                data:cachedProducts
            });
        }
        console.log("❌ Cache Miss");
        console.log("📦 Fetching products from MongoDB...");
        const products=await Product.find();
        await setCache(
            CACHE_KEYS.PRODUCTS,
            products,
            60
        );
        res.status(200).json({
            success:true,
            source:"Mongodb",
            data:products
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const getProductById=async(req,res)=>{
    try{
        const {id}=req.params;
        const cachedRedis=await getCache(CACHE_KEYS.PRODUCT(id))
        if(cachedRedis){
            console.log("✅ Product Cache Hit");
            return res.json({
                success:true,
                source:"redis cache",
                data:cachedRedis
            });
        }
        console.log("❌ Product Cache Miss");
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product Not Found'
            });
        }
        await setCache(
            CACHE_KEYS.PRODUCT(id),
            product
        );
        res.status(200).json({
            success:true,
            source:"MONGODB",
            data:product
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const updateProduct=async(req,res)=>{
    try{
        const {id} =req.params;
        const updatedProduct=await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedProduct){
            return res.status(404).json({
                success:false,
                message:"Product Not found"
            });
        }
        await deleteCache(CACHE_KEYS.PRODUCT(id),CACHE_KEYS.PRODUCTS);
        res.status(200).json({
            success:true,
            message:"Product Updated SucesFully",
            data:updatedProduct
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });

        }

        // Invalidate Cache
        await deleteCache(CACHE_KEYS.PRODUCTS,CACHE_KEYS.PRODUCT(id));

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};