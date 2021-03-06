import ReactDOM from 'react-dom';
import Pagerouter from './router/index';
import {Provider} from 'react-redux';
import store from './store'
ReactDOM.render(
    <Provider store={store}>
         <Pagerouter/>
    </Provider>
   ,
    document.getElementById('root')
)