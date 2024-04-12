import React, { useEffect } from "react";
import { FlatList, Text, View, Image, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { fetchPokemonList } from "../redux/pokemonSlice";
import { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cartSlice";

const PokemonList: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const pokemonList = useSelector(
    (state: RootState) => state.pokemon.pokemonList
  );

  const loading = useSelector((state: RootState) => state.pokemon.loading);
  const error = useSelector((state: RootState) => state.pokemon.error);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const handleAddToCart = (name: string) => {
    dispatch(addToCart({ name }));
  }

  if (loading) {
    return (
      <View style={styles.container}>
        
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={pokemonList}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.name}>{item.name}</Text>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  item.url.split("/")[6]
                }.png`,
              }}
            style={styles.image}
          />
          <Button
              title="Add to cart"
              onPress={() => handleAddToCart(item.name)}
            />
        
        </View>
      )}
      keyExtractor={(item) => item.name}
      numColumns={2}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  image: { width: 100, height: 100 },
  name: { marginTop: 30, fontSize: 16, fontWeight: "bold" },
});
export default PokemonList;
