import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import getFridgeItems from "./hooks/useFridgeItems";
import useAddFridgeItem from "./hooks/useAddFridgeItem";
import useDeleteFridgeItem from "./hooks/useDeleteFridgeItem";

const Home = () => {
  const { data, isLoading, isError, error } = getFridgeItems();
  const addFridgeItemMutation = useAddFridgeItem();
  const deleteFridgeItemMutation = useDeleteFridgeItem();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data.data.fridgeItems) {
      setItems(data.data.fridgeItems);
    }
  }, [data]);

  const handleAddItem = async (name, quantity) => {
    const item = await addFridgeItemMutation.mutateAsync({
      name,
      quantity: parseInt(quantity),
    });
    setItems([...items, { name, quantity: parseInt(quantity), id: item.id }]);
  };

  const handleRemoveItem = async (index, id) => {
    const newItems = [...items].filter(
      (item, itemIndex) => itemIndex !== index
    );
    setItems(newItems);
    await deleteFridgeItemMutation.mutateAsync(id);
  };

  const handleIncreaseQuantity = (index) => {
    let newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  };

  const handleDecreaseQuantity = (index) => {
    let newItems = [...items];
    if (newItems[index].quantity > 0) {
      newItems[index].quantity -= 1;
    }
    setItems(newItems);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AddItemForm onSubmit={handleAddItem} />
      <p className="px-4 py-2  bg-slate-200">
        <span>Produkty w lodówce:</span>
      </p>
      <ItemList
        items={items}
        onRemove={handleRemoveItem}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
      />
    </div>
  );
};

export default Home;
