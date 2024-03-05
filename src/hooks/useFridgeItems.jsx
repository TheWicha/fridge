import { useQuery } from "react-query";

const fetchFridgeItems = async () => {
  try {
    const response = await fetch(
      "https://api-eu-west-2.hygraph.com/v2/clrumm5sk033501utgf9t6n7q/master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            fridgeItems {
              id
              name
              quantity
            }
          }
        `,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching fridge items: " + error.message);
  }
};

const useFridgeItems = () => {
  return useQuery("fridgeItems", fetchFridgeItems);
};

export default useFridgeItems;
