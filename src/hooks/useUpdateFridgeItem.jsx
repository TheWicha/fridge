import { GraphQLClient } from "graphql-request";
import { useMutation } from "react-query";
const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI);

const updateFridgeItem = async ({ name, quantity }) => {
  const query = `
mutation MyMutation($name: String!, $quantity: Int!) {

  publishManyFridgeItems {
    count
  }
  updateFridgeItem(data: {quantity: $quantity}, where: {name: $name}) {
    id
  }
}

  `;

  const variables = { name, quantity };

  try {
    const data = await graphQLClient.request(query, variables);
    return data.updateFridgeItem;
  } catch (error) {
    throw new Error("Error adding fridge item: " + error.message);
  }
};

const useUpdateFridgeItem = () => {
  return useMutation(updateFridgeItem);
};

export default useUpdateFridgeItem;
