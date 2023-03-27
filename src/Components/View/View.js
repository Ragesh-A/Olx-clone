import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

import './View.css';
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    if (postDetails != null) {
      console.log('123456');
      const { userId } = postDetails;
      firebase
        .firestore()
        .collection('users')
        .where('id', '==', userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    } else {
      console.log('shdfdgfh');
      history.push('/');
    }
  }, []);

  return (
    <div className="viewParentDiv">
      {postDetails && (
        <>
          <div className="imageShowDiv">
            <img src={postDetails.url} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails.price} </p>
              <span>{postDetails.name}</span>
              <p>{postDetails.category}</p>
            </div>
            {userDetails && (
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{userDetails.username}</p>
                <p>ph : {userDetails.phone} </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default View;
