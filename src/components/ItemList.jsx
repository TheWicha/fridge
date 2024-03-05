import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";

const ItemList = ({ items, onRemove, onIncrease, onDecrease }) => (
  <ul className="bg-white">
    {items.map((item, index) => (
      <li key={index} className="px-4 py-2 flex justify-between border-b">
        <p>
          <span>{item.name}</span> - <span>{item.quantity} szt.</span>
        </p>
        <div className="flex items-center">
          <button
            className="m-2 bg-green-300 rounded-lg w-12 text-black"
            onClick={() => onIncrease(index)}
          >
            +
          </button>
          <button
            className="m-2 bg-red-300 rounded-lg w-12 text-black"
            onClick={() => onDecrease(index)}
          >
            -
          </button>
          <button
            onClick={() => onRemove(index, item.id)}
            className="ml-2 h-6 w-6 bg-gray-400 rounded-lg text-black"
          >
            <TrashIcon className="w-6" />
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default ItemList;
