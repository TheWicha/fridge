import { GraphQLClient } from "graphql-request";
import { useMutation } from "react-query";
const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI);

const addFridgeItem = async ({ name, quantity }) => {
  const query = `
    mutation MyMutation($name: String!, $quantity: Int!) {
      createFridgeItem(data: { name: $name, quantity: $quantity }) {
        id
        name
        quantity
      }
        publishManyFridgeItems {
count
  }
    }
  `;

  const variables = { name, quantity };

  try {
    const data = await graphQLClient.request(query, variables);
    return data.createFridgeItem;
  } catch (error) {
    throw new Error("Error adding fridge item: " + error.message);
  }
};

const useAddFridgeItem = () => {
  return useMutation(addFridgeItem);
};

export default useAddFridgeItem;
