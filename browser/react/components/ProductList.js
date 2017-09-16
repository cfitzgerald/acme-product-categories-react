import React, { Component } from 'react';

export default class ProductList extends Component {
  render() {
    return (
      <div className="col-sm-6">
        <div>
          <div className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <input name="name" className="form-control" value="testValue"></input>
                  </div>
                </form>
                <form>
                  <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" className="form-control" value="testValue"></input>
                  </div>
                </form>
                <form>
                  <div className="form-group">
                    <label>In Stock</label>
                    <br></br>
                    <input type="checkbox" name="inStock" value="on"></input>
                  </div>
                </form>
                <form>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="categoryId" className="form-control">
                      <option value>-- none --</option>
                      <option value="1">Normal</option>
                      <option value="2">Beyond</option>
                    </select>
                  </div>
                </form>
                <form>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Save</button>
                    <button className="btn btn-danger btn-block">Delete</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
