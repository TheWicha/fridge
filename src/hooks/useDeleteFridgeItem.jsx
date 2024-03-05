import { GraphQLClient } from "graphql-request";
import { useMutation } from "react-query";

const graphcmsToken = process.env.REACT_APP_GRAPHCMS_TOKEN;
const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: graphcmsToken,
  },
});

const deleteFridgeItem = async (id) => {
  const query = `
    mutation MyMutation($id: ID!) {
    deleteFridgeItem(where: { id: $id }) {
        id
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query, { id });
    return data.deleteFridgeItem;
  } catch (error) {
    throw new Error("Error deleting fridge item: " + error.message);
  }
};

const useDeleteFridgeItem = () => {
  return useMutation(deleteFridgeItem);
};

export default useDeleteFridgeItem;
