import { TypeTodo } from "../Type/TypeTodo";
import axiosClient from "./Client";

const API = {
  getAll() {
    const url = `/products`;
    return axiosClient.get(url);
  },
  get(id:any) {
    const url = `products${id}`;
    return axiosClient.get(url);
  },
  add(todo: TypeTodo) {
    const url = `/products`;
    return axiosClient.post(url, todo);
  },
  remote(id:string){
    const url = `/products//${id}`;
    return axiosClient.delete(url)
  },
  update(id: string, itemProduct: TypeTodo) {
    const url = `/products/${id}`;
    axiosClient.put(url, itemProduct)
},
};
export default API;