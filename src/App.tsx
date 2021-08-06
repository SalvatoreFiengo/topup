import { FC } from 'react';
import HeaderComponent from './components/header/header';
import MainComponent from './components/main/main';

const App:FC = ()=> {

  return (
    <div>
      <HeaderComponent/>
      <MainComponent/>
    </div>
  );
}

export default App;
