import axios from "axios";
import { IProduct } from "../models/product";

const apiRequest = axios.create({
  baseURL: "https://dummyjson.com/",
});


export const coreService ={
  get: <T=any>(path: string) => {
    return apiRequest.get<T>(path).then(r=>r.data)
  },
  post: (path: string, data: IProduct) => {
    return  apiRequest.post(path, data);
  
 }, 
 put: <T>(path: string, data: T) => {
  return  apiRequest.put<T>(path, data);
 
 }, 
 deleteProduct: <T=any>(path: string) => {
  return  apiRequest.delete<T>(path)
 
 }
 
}



export default apiRequest;
