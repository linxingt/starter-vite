import { useOne, useShow } from "@refinedev/core";

export const ShowProduct = () => {
  // const { data, isLoading } = useOne({ resource: "products", id: 123 });
  // useShow affichage dynamique + pas bsn id et resource
  const { queryResult: { data, isLoading } } = useShow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Product name: {data?.data.name}</div>;
};