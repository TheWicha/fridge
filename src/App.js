import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import useFridgeItems from "./hooks/useFridgeItems";
import useAddFridgeItem from "./hooks/useAddFridgeItem";
import useDeleteFridgeItem from "./hooks/useDeleteFridgeItem";
import useUpdateFridgeItem from "./hooks/useUpdateFridgeItem";

const Home = () => {
  const { data, isLoading, isError, error } = useFridgeItems();
  const addFridgeItemMutation = useAddFridgeItem();
  const deleteFridgeItemMutation = useDeleteFridgeItem();
  const updateFridgeItemMutation = useUpdateFridgeItem();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data.fridgeItems) {
      setItems(data.fridgeItems);
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
    await deleteFridgeItemMutation.mutate(id);
  };

  const handleIncreaseQuantity = async (item) => {
    setItems(
      items.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
    updateFridgeItemMutation.mutate({
      name: item.name,
      quantity: item.quantity + 1,
    });
  };

  const handleDecreaseQuantity = async (item) => {
    setItems(
      items.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

    updateFridgeItemMutation.mutate({
      name: item.name,
      quantity: item.quantity - 1,
    });
  };

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
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
