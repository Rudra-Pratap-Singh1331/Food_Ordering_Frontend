import './App.css';
import AppLayout from './Components/AppLayout';
import Cart from './Components/Cart';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import RestroDetail from './Components/RestroDetaill';
import Explore from './Components/Explore';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/restro/:id", element: <RestroDetail /> },
      { path: "/explore", element: <Explore /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
