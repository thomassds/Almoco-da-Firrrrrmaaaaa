import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fetchRestaurants } from 'redux-flow/reducers/restaurant/action-creators'


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); })
  return images;
}

const images = importAll(require.context('../../assets/', false, /\.jpg/));


const First = ({ list, fetch }) => {
  useEffect(() => {
    fetch() 
  }, [])

  const orderDeslikes = list.sort((a,b) => b.dislikes - a.dislikes);

  function UrlIMG(url){
    var res = url.split("/");

    return res[1];
  }

  return (
    <Wrapper>      
      {list.map((restaurant, item) => (
        <Restaurant key={item}>
          <Avatar >
            <img src={ images[UrlIMG(restaurant.url)]}/>
          </Avatar>
          <Profile>
            <strong>{ restaurant.name } - { restaurant.dislikes}</strong>
            
          </Profile>
        </Restaurant>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Restaurant = styled.div`
  width: 100%;
  font-size: 18px;
  max-width: 1080px;
  margin: 20px auto 0;
  padding: 50px;
  background: #fff;
  border-radius: 5px;
  border: 1px #ddd;
  


  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
`
const Avatar = styled.div`
  width: 250px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #fff;
  border-radius: 36px;
    &:hover{
      border-color: #ff0000;
    }
  
  >img{
    width: 250px;
    height: 140px;  
    border-radius: 30px;  
    &:hover{
      
      opacity: 0.5;
    }
  }
`
const Profile = styled.div` 
  margin-top: 19px;
  width: 335px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;  
  
  >strong{
    color: #fff;
    font-size: 22px;
  }
`

const mapStateToProps = state => ({
  list: state.restaurant.list,
  count: state.restaurant.count
})

const mapDispatchToProps = dispatch => ({
  fetch: () => {
    dispatch(fetchRestaurants())
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(First)