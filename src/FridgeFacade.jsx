import React from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import useFridgeItemsManager from "./hooks/useFridgeItemsManager";

const FridgeFacade = ({ onLogout }) => {
  const {
    items,
    isLoading,
    isError,
    handleAddItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useFridgeItemsManager();
  const fridgeItems = items.filter((item) => item.category === "fridge");
  const spicesItems = items.filter((item) => item.category === "spices");
  const chemistryItems = items.filter((item) => item.category === "chemistry");
  return (
    <div>
      <AddItemForm onSubmit={handleAddItem} onLogout={onLogout} />
      {isLoading && (
        <div className="w-full flex justify-center p-6 animate-ping ">
          Loading...
        </div>
      )}
      {!isLoading && (
        <>
          <ItemList
            category="Lodówka"
            items={fridgeItems}
            onRemove={handleRemoveItem}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            isError={isError}
          />
          <ItemList
            category="Przyprawy"
            items={spicesItems}
            onRemove={handleRemoveItem}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            isError={isError}
          />
          <ItemList
            category="Chemia"
            items={chemistryItems}
            onRemove={handleRemoveItem}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            isError={isError}
          />
        </>
      )}
    </div>
  );
};

export default FridgeFacade;
