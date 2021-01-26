import axios, { AxiosResponse } from 'axios';
import IProduct from '../Components/ProductsPage/IProduct';


export interface IProductService {
    getProducts(url: string): Promise<[IProduct[], string]>;
    getProduct(url: string): Promise<[IProduct | null, string]>;
}



export class ProductService implements IProductService {
    
    

    async getProducts(url: string): Promise<[IProduct[], string]> {
        let products: IProduct[] = [];
        let errorText: string = '';
        
        try{
            let data: AxiosResponse<any> = await axios.get(url);
            if(data.data){
                products = data.data;
            }      
        }catch(e){
            console.log("message: "+e.message);
            errorText = e.message;
            if(e.response){
                console.log("status: "+e.response.status);
            }        
        }
        let resultTuple: [IProduct[], string] = [products, errorText];    
        return resultTuple;
    }



    



    async getProduct(url: string): Promise<[IProduct | null, string]> {

        let product: IProduct | null = null;
        let errorText: string = '';
        try{
            let response: AxiosResponse<any> = await axios.get(url);
            if(response.data){
                product = response.data;
            }
        }catch(e){
            console.log("message: "+e.message);
            errorText = e.message;
            if(e.response){
                console.log("status: "+e.response.status);
            } 
        }
        let resultTuple: [IProduct | null, string] = [product, errorText];   
        return resultTuple;

    }
}


