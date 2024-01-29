const PriceParser = (price: string | number | undefined) => {
  let response: string = "";
  price = `${price}`;
  let counter: number = 0;
  for (let i = price.length - 1; i >= 0; i--) {
    response = price[i] + response;
    counter++;
    if (counter % 3 === 0) {
      response = " " + response;
    }
  }
  return response;
};

export default PriceParser;
