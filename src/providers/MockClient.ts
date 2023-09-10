const get = () => {
  return [
    {
      data: new Date("2023-08-28"),
      ticker: "ITSA4",
      precoUnitario: 9.6,
      quantidade: 100,
      precoTotal: 960,
      operacao: "Compra",
      tipo: "Ação",
    },
    {
      data: new Date("2023-08-28"),
      ticker: "VALE3",
      precoUnitario: 62,
      quantidade: 100,
      precoTotal: 6200,
      operacao: "Compra",
      tipo: "Ação",
    },
    {
      data: new Date("2023-08-29"),
      ticker: "AGRO3",
      precoUnitario: 30,
      quantidade: 100,
      precoTotal: 3000,
      operacao: "Compra",
      tipo: "Ação",
    },
  ];
};

export const MockClient = {
  get,
};
