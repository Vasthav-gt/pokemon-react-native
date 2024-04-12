import { combineReducers } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
