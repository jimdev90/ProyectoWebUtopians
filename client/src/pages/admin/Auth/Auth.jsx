import { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import './Auth.scss';
import { Icon } from '../../../assets';
import { RegisterForm, LoginForm } from '../../../components/Admin/Auth'


export function Auth() {

  const [activeIndex, setActiveIndex] = useState();

  const openLogin = () => {
    setActiveIndex(0);
  }

  const panes = [
    {
      menuItem: 'Entrar',
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Nuevo usuario',
      render: () => (
        <Tab.Pane>
          <RegisterForm 
            openLogin={openLogin}
          />
        </Tab.Pane>
      )
    }
  ];

  return (
    <div className='auth'>
      <Icon.LogoUtopian className='logo' />
      <Tab 
        panes={panes}
        className='auth__forms'
        activeIndex={activeIndex}
        onTabChange={ (_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  )
}
