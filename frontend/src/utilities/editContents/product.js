export const editProducts = [
  {
    id: "skuNo",
    placeholder: "Enter the SKU number",
    type: "text",
    readOnly: true,
  },
  {
    id: "name",
    placeholder: "Enter the product name",
    type: "text",
    readOnly: false,
  },
  {
    id: "description",
    placeholder: "Enter the description",
    type: "text",
    readOnly: false,
  },
  {
    id: "quantity",
    placeholder: "Enter the Quantity",
    type: "number",
    readOnly: false,
  },
  {
    id: "price",
    placeholder: "Enter the selling price",
    type: "number",
    readOnly: false,
  },
];

export const editProductSelect = [
  {
    id: "category",
    values: [{ value: "Playable" }, { value: "Machine" }, { value: "Rock" }],
  },
  {
    id: "vendor",
    values: [{ value: "Anish" }, { value: "Manish" }],
  },
];
