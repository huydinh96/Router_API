import * as Types from './../contants/ActionType';
import callAPI from './../utils/apiCaller';

export const actFetchProductsResquest = () =>{
    return (dispatch) =>{
        return callAPI('products','GET',null).then(res =>{
            dispatch(actFetchProducts(res.data));
        })
    };
}
export const actFetchProducts = (products) =>{
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

export const actDeleteProductResquest = (id) =>{
    return (dispatch) =>{
        return callAPI(`products/${id}`,'DELETE',null).then(res =>{
            dispatch(actDeleteProduct(id));
        })
    }
}
export const actDeleteProduct = (id) =>{
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}
export const actAddProductRequest = (product) =>{
    return (dispatch) =>{
        return callAPI('products','POST',product).then(res =>{
            dispatch(actAddProduct(res.data));
        })
    }
}
export const actAddProduct = (product) =>{
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}