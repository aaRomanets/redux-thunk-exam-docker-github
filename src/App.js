import React from 'react';
import {requestDog, requestDogSuccess, requestDogError} from './actions/actions'

//функция загрузки веб-адреса картинки с сервера 
//(она возвращает функцию проведения указанного процесса в которую подается компонент dispatch)
const fetchDog = () => {
  return (dispatch) => {
    //начинается загрузка адреса картинки с сервера, соответствующую функцию оборачиваем в компонент dispatch 
    dispatch(requestDog()); 
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then (
      //загрузка веб-адреса картинки с сервера можент быть успешно завершена, соответствующую функцию оборачиваем в dispatch 
      data => dispatch(requestDogSuccess(data)),
      //загрузка веб-адреса картинки с севера может окончиться с ошибкой, соответствующую функцию оборачиваем в dispatch 
      err => dispatch(requestDogError(err))
    )
  }
}

//Компонент проекта
class App extends React.Component {
  render () {
    return (
      <div>
        {/*компонент dispatch вытаскиваем из props, и в него оборачиваем функцию загрузки веб-адреса картинки с сервера  */}
        <button onClick={() => this.props.dispatch(fetchDog())}>Show Dog</button>
        {
          //из props получаем результат о проведении указанного процесса
          this.props.loading
        ? 
          <p>Loading...</p>
        : 
          //из props получаем результат об ошибке, которая возникла при проведении указанного процесса
          this.props.error 
        ? 
          <p>Error, try again</p> 
        :
          //изображаем картинку, веб-адрес которой получен в результате проведенного скачивания 
          <p><img alt="" src={this.props.url}/></p>
        }
      </div>      
    )
  }  
}

export default App;
