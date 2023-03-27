import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/Context'
import { useHistory } from 'react-router-dom';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const {user} = useContext(AuthContext)
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('')
  const [err, setErr] = useState('')
  const date = new Date()

  const handleSubmit = (e)=>{
    e.preventDefault()
  if (user){ firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then(url=>{
         firebase.firestore().collection('products').add({
          name: product,
          category,
          price,
          url,
          userId : user.uid,
          createdAt : date 
         })
         history.push('/')
      })
     })}else{
      setErr('login required')
     }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="product">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="product"
              name="product"
              onChange={(e) => setProduct(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price" onChange={(e)=>setPrice(e.target.value)}/>
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>
          <form>
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <p className='error'>{err}</p>
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
