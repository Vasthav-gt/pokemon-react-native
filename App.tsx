import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import PokemonList from "./components/PokemonList";
import Cart from "./components/Cart";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PokemonList />
      <Cart />
    </Provider>
  );
};
export default App;
