import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './Post.css';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [product, setProduct] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const history =  useHistory()

  useEffect(() => {
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshort) => {
        const allPost = snapshort.docs.map((products) => {
          return {
            ...products.data(),
            id: products.id,
          };
        });
        console.log(allPost);
        setProduct(allPost);
      });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {product.map((product) => {
            return (
              <div className="card" key={product.id} onClick={()=>{
                setPostDetails(product);
                history.push('/view')
                console.log("cliked");
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name">{product.category}</p>
                </div>
                <div className="date">
                  <span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
