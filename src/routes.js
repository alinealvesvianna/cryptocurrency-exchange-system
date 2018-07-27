import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {
  Home,
  Faq,
  Simulador,
  RegisterSuccess,
  RegisterDados
} from './containers/pages';


const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
    </Switch>
  );
};

export default Routes;
