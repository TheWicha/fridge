import React, { useState, useRef } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

const ItemList = ({ items, onRemove, onIncrease, onDecrease, category }) => {
  return (
    <>
      <div className="mx-auto px-5 bg-white min-h-sceen">
        <div className="grid divide-y divide-neutral-200 mx-auto mt-8">
          <div className="bg-slate-200">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <p className="px-4 py-2 ">
                  <span>{category}:</span>
                </p>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <ul className="bg-white">
                {items.map((item, index) => (
                  <li
                    name={item.name}
                    key={index}
                    className={clsx("px-4 py-2 flex justify-between border-b")}
                  >
                    <p
                      className={clsx({
                        "text-red-500": item.quantity === 0,
                      })}
                    >
                      <span>{item.name}</span> -{" "}
                      <span>{item.quantity} szt.</span>
                    </p>
                    <div className="flex items-center">
                      <button
                        className="m-2 bg-green-300 rounded-lg w-12 text-black hover:bg-green-500"
                        onClick={() => onIncrease(item)}
                      >
                        +
                      </button>
                      <button
                        className="m-2 bg-red-300 rounded-lg w-12 text-black hover:bg-red-500"
                        onClick={() => onDecrease(item)}
                      >
                        -
                      </button>
                      <button
                        onClick={() => onRemove({ index, id: item.id })}
                        className="ml-2 h-6 w-6 bg-gray-300 rounded-lg text-black hover:bg-gray-400"
                      >
                        <TrashIcon className="w-6" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemList;
