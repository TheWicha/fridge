import { useMutation } from "react-query";
import { GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.REACT_APP_NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const client = new GraphQLClient(graphqlAPI);

const UPDATE_FRIDGE_ITEM = `
  mutation MyMutation($name: String!, $quantity: Int!) {
    updateFridgeItem(data: {quantity: $quantity}, where: {name: $name}) {
      id
    }
    publishFridgeItem(where: {name: $name}) {
      id
    }
  }
`;

export default function useUpdateFridgeItem() {
  return useMutation(({ name, quantity }) =>
    client.request(UPDATE_FRIDGE_ITEM, { name, quantity })
  );
}
