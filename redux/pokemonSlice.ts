import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface Pokemon {
  name: string;
  url: string;
  id: number;
}
interface PokemonState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
};

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon'
    );
    const pokemonData = await response.json();
    return pokemonData.results;
  }
);

// lazy-loaded redux slice
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching Pokémon data";
      });
  },
});
export default pokemonSlice.reducer;

