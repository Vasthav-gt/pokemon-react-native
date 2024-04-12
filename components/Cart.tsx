import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers";
import { removeFromCart, adjustQuantity } from "../redux/cartSlice";
const Cart: React.FC = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    calculateTotalCost();
  }, [cartItems]);

  const handleRemove = (name: string) => {
    dispatch(removeFromCart({ name }));
  };
  const [totalCost, setTotalCost] = useState<number>(0);

  const handleAdjustQuantity = (name: string, quantity: number) => {
    if(quantity === 0){
      dispatch(removeFromCart({ name }));
    }
    dispatch(adjustQuantity({ name, quantity }));
  };

  const calculateTotalCost = async (): Promise<void> => {
    let newTotalCost = 0; // Iterate over each item in the cart
    for (const item of cartItems) {
      try {
        // Fetch Pokémon details from PokeAPI using item name
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${item.name}`
        );
        const pokemonData = await response.json(); 
        const weight = pokemonData.weight;
        const cost = weight * 0.01; // Add cost of the Pokémon to newTotalCost
        newTotalCost += cost * item.quantity;
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    } // Update the total cost in state
    setTotalCost(newTotalCost);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Cart</Text>
      {totalCost > 0 && <Text style={styles.totalCost}>
        Total Cost: ${totalCost.toFixed(2)}
      </Text>}
      {cartItems.map((item) => (
        <View key={item.name} style={styles.item}>
          
          <Text>{item.name}</Text>
          <View style={styles.controls}>
            
            <Button
              title="-"
              onPress={() => handleAdjustQuantity(item.name, Math.max(0, item.quantity - 1))}
            />
            <Text>{item.quantity}</Text>
            <Button
              title="+"
              onPress={() => handleAdjustQuantity(item.name, item.quantity + 1)}
            />
          </View>
          <Button title="Remove" onPress={() => handleRemove(item.name)} />
        </View>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 10 },
  totalCost: { marginBottom: 10, fontWeight: 'bold', fontSize: 18, },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  controls: { flexDirection: "row", alignItems: "center" },
});
export default Cart;
