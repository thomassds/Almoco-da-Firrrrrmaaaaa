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



const View = ({ list, fetch }) => {
  useEffect(() => {
    fetch() 
  }, [])

  const orderName = list.sort((a,b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1; 
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1;
    return 0; 
  
  });
  

  function addLike(item){
      list[item].likes = list[item].likes + 1;  
  }

  function addDislike(item){
      list[item].dislikes = list[item].dislikes + 1;
  }
  
  function UrlIMG(url){
    var res = url.split("/");

    return res[1];
  }
  
  
  return (
    <Wrapper>
      
      {list.map((restaurant, item) => (

        

        <Restaurant key={ item }> 
            
            <Avatar >     
              <img src={ images[UrlIMG(restaurant.url)]}/>
            </Avatar>
            <Profile>
              <strong>{ restaurant.name }</strong>
              <Buttons>
                <button onClick={() => { addLike(item)}}><strong>Likes</strong></button>
                <button className="Dislike" onClick={() => {addDislike(item)}}><strong>Não Gostei</strong></button>
              </Buttons>
              
            </Profile>    
        </Restaurant>
      ))}
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  
  margin-top: 30px; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  
`
const Restaurant = styled.div`
max-width: 1080px;
  margin: 20px auto 0;
  padding: 50px;
  background: #fff;
  border-radius: 5px;
  border: 1px #ddd;


  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background: none;
`

const Avatar = styled.div`
    width: 700px;
    height: 420px; 
       
  >img{
    width: 700px;
    height: 420px;
    background:#fff;
    border-radius: 30px;
    border: 8px solid #fff;
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

const Buttons = styled.div`
  margin-top: 19px;
  width: 100%;
  display: flex;
  justify-content: space-between;


  >button{
    height: 50px;
    width: 130px;
    border-radius: 20px;
    background: #00FF00;
    border-color:	#00FF00;
    cursor: pointer;

    &:hover{
      opacity: 0.5;
    }
    
    >strong{
      font-size: 16px;
    }
  }

  >button.Dislike {
    background: #ff0000 ;
    border-color:	#ff0000;
    
    >strong{
    color: #fff;

    
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(View)