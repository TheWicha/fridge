import { useQuery, useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";

const graphcmsToken = process.env.REACT_APP_GRAPHCMS_TOKEN;
const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: graphcmsToken,
  },
});

const fetchFridgeItems = async () => {
  const query = `
    query MyQuery {
      fridgeItems {
        id
        name
        quantity
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data;
  } catch (error) {
    throw new Error("Error fetching fridge items: " + error.message);
  }
};

const useFridgeItems = () => {
  const queryClient = useQueryClient();

  const updateCache = (newData) => {
    queryClient.setQueryData("fridgeItems", newData);
  };

  return useQuery("fridgeItems", fetchFridgeItems, {
    onSuccess: (data) => {
      updateCache(data);
    },
  });
};

export default useFridgeItems;
