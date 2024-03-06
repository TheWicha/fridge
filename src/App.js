import React, { useState, useEffect, useRef } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import getFridgeItems from "./hooks/useFridgeItems";
import useAddFridgeItem from "./hooks/useAddFridgeItem";
import useDeleteFridgeItem from "./hooks/useDeleteFridgeItem";
import useUpdateFridgeItem from "./hooks/useUpdateFridgeItem";

const Home = () => {
  const { data, isLoading, isError, error } = getFridgeItems();
  const addFridgeItemMutation = useAddFridgeItem();
  const deleteFridgeItemMutation = useDeleteFridgeItem();
  const updateFridgeItemMutation = useUpdateFridgeItem();
  const itemsRef = useRef();

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

  const handleIncreaseQuantity = async (item) => {
    const newItems = [...items];

    const update = newItems.find((product) => product.id === item.id);
    update.quantity += 1;
    setItems(newItems);
    await updateFridgeItemMutation.mutateAsync({
      name: item.name,
      quantity: item.quantity + 1,
    });
  };
  const handleDecreaseQuantity = async (item) => {
    const newItems = [...items];

    const update = newItems.find((product) => product.id === item.id);
    update.quantity -= 1;
    setItems(newItems);
    await updateFridgeItemMutation.mutateAsync({
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
        itemsRef={itemsRef}
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
