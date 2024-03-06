import { GraphQLClient } from "graphql-request";
import { useMutation } from "react-query";
const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI);

const addFridgeItem = async ({ name, quantity, category }) => {
  const query = `
mutation MyMutation($name: String!, $quantity: Int!, $category:String!) {
  createFridgeItem(
    data: {name: $name, quantity: $quantity, category: $category}
  ) {
    id
    name
    quantity
    category
  }
  publishManyFridgeItems {
    count
  }
}


  `;

  const variables = { name, quantity, category };

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
