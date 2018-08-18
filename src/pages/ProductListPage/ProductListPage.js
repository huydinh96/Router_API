import React, { Component } from 'react';
import ProductList from './../../conponents/ProductList/ProductList';
import ProductItem from './../../conponents/ProductItem/ProductItem';
import {connect} from 'react-redux';
// import apiCaller from './../../utils/apiCaller';
import {Link} from 'react-router-dom';
import { actFetchProductsResquest,actDeleteProductResquest } from './../../actions/index';
class ProductListPage extends Component {

    // constructor(props){
    //     super(props);
    //     // this.state = {
    //     //     products: []
    //     // };
    // }

    componentDidMount(){
        // axios({
        //     method: "GET",
        //     url:"http://localhost:3000/products",
        //     data: null
        // }).then(res =>{
        //     console.log(res);
        //     this.setState({
        //         products: res.data
        //     })
        // }).catch(err =>{
        //     console.log(err);
        // });
        // apiCaller('products','GET',null).then(res =>{
        //     this.props.fetchAllProducts(res.data);
        // });
        this.props.fetchAllProducts();
    }
    onDelete = (id) =>{
        // var  {products} = this.state;
        // callAPI(`products/${id}`,'DELETE',null).then(res =>{
        //     if(res.status === 200){
        //         var index = this.findIndex(products,id);
        //         if(index !== -1){
        //             products.splice(index,1)
        //             this.setState({
        //                 products:products
        //             })
        //         }
        //     }
        // })
        this.props.onDeleteProduct(id);
    }
    // findIndex = (products ,id) =>{
    //     var result = -1;
    //     products.forEach((product,index) => {
    //         if(product.id === id){
    //             result = index;
    //         }
    //     });
    //     return result;
    // }
    render() {
        var {products}=this.props;
        // var {products} = this.state;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to="/product/add" type="button" className="btn btn-info mb-10">Thêm Sản Phẩm</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
    }
    showProducts = (products) =>{
        var result = null;
        if(products.length > 0){
            result = products.map((product,index) =>{
                return (
                    <ProductItem 
                        key={index}
                        product={product}
                        index = {index}
                        onDelete = {this.onDelete}
                    />
                )
            })
        }
        return result;
    }
}
const mapStateToProps = state => {
    return {
        products: state.products
    }
};
const mapDispatchToProps = (dispatch,props) =>{
    return {
        fetchAllProducts : () =>{
            dispatch(actFetchProductsResquest());
        },
        onDeleteProduct: (id) =>{
            dispatch(actDeleteProductResquest(id));
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListPage);