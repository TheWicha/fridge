import { useState, useEffect } from "react";
import useFridgeItems from "./useFridgeItems";
import useAddFridgeItem from "./useAddFridgeItem";
import useDeleteFridgeItem from "./useDeleteFridgeItem";
import useUpdateFridgeItem from "./useUpdateFridgeItem";

const useFridgeItemsManager = () => {
  const { data, isLoading, isError, error } = useFridgeItems();
  const addFridgeItemMutation = useAddFridgeItem();
  const deleteFridgeItemMutation = useDeleteFridgeItem();
  const updateFridgeItemMutation = useUpdateFridgeItem();

  const [itemsWithId, setItemsWithId] = useState([]);

  useEffect(() => {
    if (data && data.fridgeItems) {
      const itemsWithId = data.fridgeItems.map((item) => ({
        ...item,
        id: item.id,
      }));
      setItemsWithId(itemsWithId);
    }
  }, [data]);

  const handleAddItem = async (name, quantity, category) => {
    try {
      const addedItem = await addFridgeItemMutation.mutateAsync({
        name,
        quantity: parseInt(quantity),
        category,
      });
      setItemsWithId([...itemsWithId, { ...addedItem, id: addedItem.id }]);
    } catch (error) {
      console.error("Error adding item:", error);
      return { error };
    }
  };

  const handleRemoveItem = async ({ index, id }) => {
    const newItems = itemsWithId.filter((item) => item.id !== id);
    setItemsWithId(newItems);
    await deleteFridgeItemMutation.mutate(id);
  };

  const handleIncreaseQuantity = async (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    setItemsWithId(
      itemsWithId.map((i) => (i.id === item.id ? updatedItem : i))
    );
    await updateFridgeItemMutation.mutate({
      name: item.name,
      quantity: updatedItem.quantity,
    });
  };

  const handleDecreaseQuantity = async (item) => {
    if (item.quantity >= 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      setItemsWithId(
        itemsWithId.map((i) => (i.id === item.id ? updatedItem : i))
      );
      await updateFridgeItemMutation.mutate({
        name: item.name,
        quantity: updatedItem.quantity,
      });
    }
  };

  return {
    items: itemsWithId,
    isLoading,
    isError,
    error,
    handleAddItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useFridgeItemsManager;
