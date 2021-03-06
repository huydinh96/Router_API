import React, { Component } from 'react';
import callAPI from './../../utils/apiCaller';
import {Link} from 'react-router-dom';
import {actAddProductRequest} from './../../actions/index';
import {connect} from 'react-redux';
class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            txtName:'',
            txtPrice:'',
            txtStatus:'',
        };
    }
    componentDidMount(){
        var {match} = this.props;
        if(match){
            var id = match.params.id;
            callAPI(`products/${id}`,'GET',null).then(res =>{
                var data = res.data;
                this.setState({
                    id: data.id,
                    txtName:data.name,
                    txtPrice:data.price,
                    txtStatus:data.status,
                });
            });
        }
     }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) =>{
        e.preventDefault();
        var {history} = this.props;
        var {id,txtName,txtPrice,txtStatus} = this.state;
        var product = {
            id:id,
            name: txtName,
            price: txtPrice,
            status: txtStatus,
        }
        if(id){ //update
            callAPI(`products/${id}`,'PUT', {
                name: txtName,
                price:txtPrice,
                status:txtStatus
            }).then(res =>{
                history.goBack();
            });
        } 
        else{
            this.props.onAddProduct(product);
            history.goBack();
            // callAPI('products','POST',{
            //     name: txtName,
            //     price:txtPrice,
            //     status:txtStatus
            // }).then(res =>{
            //     history.goBack();
            // });
        }
    }
    render() {
        var {txtName,txtPrice,txtStatus}= this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên Sản Phẩm</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Giá: </label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                name="txtStatus"
                                value={txtStatus}
                                onChange={this.onChange}
                                checked={txtStatus}
                                />
                            Còn Hàng
                        </label>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">
                        Trở Lại
                    </Link>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {
        onAddProduct: (product) =>{
            dispatch(actAddProductRequest(product));
        }
    }
}
export default connect(null,mapDispatchToProps)(ProductActionPage);