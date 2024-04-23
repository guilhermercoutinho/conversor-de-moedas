const convertButton = document.querySelector("#convert-button");
const switchButton = document.querySelector("#switch-button");
const selectToConvert = document.querySelector(".select-to-convert");
const selectConverted = document.querySelector(".select-converted");

//FUNÇÃO DE FORMATAÇÃO DE VALORES
function formatCurrency(name, value) {
  if (name === "real") {
    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  if (name === "dolar") {
    return Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  if (name === "euro") {
    return Intl.NumberFormat("de-de", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }

  if (name === "libra") {
    return Intl.NumberFormat("gp-en", {
      style: "currency",
      currency: "GBP",
    }).format(value);
  }
}

// INÍCIO FUNÇÃO CONVERTER
async function convertCurrency() {
  let valueInput = document.querySelector("#value-input").value;
  const currencyToConvert = document.querySelector(
    "#currency-to-convert > span"
  );
  const convertedValue = document.querySelector("#converted-value > span");

  const data = await fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL"
  ).then((response) => response.json());

  const dolar = data.USDBRL.high;
  const euro = data.EURBRL.high;
  const libra = data.GBPBRL.high;

  if (valueInput === "") {
    valueInput = 1;
  }

  if (selectToConvert.value === "real") {
    currencyToConvert.innerHTML = formatCurrency("real", valueInput);

    if (selectConverted.value === "dolar") {
      convertedValue.innerHTML = formatCurrency("dolar", valueInput / dolar);
    } else if (selectConverted.value === "euro") {
      convertedValue.innerHTML = formatCurrency("euro", valueInput / euro);
    } else if (selectConverted.value === "libra") {
      convertedValue.innerHTML = formatCurrency("libra", valueInput / libra);
    } else {
      convertedValue.innerHTML = formatCurrency("real", valueInput);
    }
  }

  if (selectToConvert.value === "dolar") {
    currencyToConvert.innerHTML = formatCurrency("dolar", valueInput);

    if (selectConverted.value === "real") {
      convertedValue.innerHTML = formatCurrency("real", valueInput * dolar);
    } else if (selectConverted.value === "euro") {
      convertedValue.innerHTML = formatCurrency(
        "euro",
        valueInput * (dolar / euro)
      );
    } else if (selectConverted.value === "libra") {
      convertedValue.innerHTML = formatCurrency(
        "libra",
        valueInput * (dolar / libra)
      );
    } else {
      convertedValue.innerHTML = formatCurrency("dolar", valueInput);
    }
  }

  if (selectToConvert.value === "euro") {
    currencyToConvert.innerHTML = formatCurrency("euro", valueInput);

    if (selectConverted.value === "real") {
      convertedValue.innerHTML = formatCurrency("real", valueInput * euro);
    } else if (selectConverted.value === "dolar") {
      convertedValue.innerHTML = formatCurrency(
        "dolar",
        valueInput * (euro / dolar)
      );
    } else if (selectConverted.value === "libra") {
      convertedValue.innerHTML = formatCurrency(
        "libra",
        valueInput * (euro / libra)
      );
    } else {
      convertedValue.innerHTML = formatCurrency("euro", valueInput);
    }
  }

  if (selectToConvert.value === "libra") {
    currencyToConvert.innerHTML = formatCurrency("libra", valueInput);

    if (selectConverted.value === "real") {
      convertedValue.innerHTML = formatCurrency("real", valueInput * libra);
    } else if (selectConverted.value === "dolar") {
      convertedValue.innerHTML = formatCurrency(
        "dolar",
        valueInput * (libra / dolar)
      );
    } else if (selectConverted.value === "euro") {
      convertedValue.innerHTML = formatCurrency(
        "euro",
        valueInput * (libra / euro)
      );
    } else {
      convertedValue.innerHTML = formatCurrency("libra", valueInput);
    }
  }
}

function changeCurrency() {
  const currencyImageToConvert = document.querySelector(
    ".currency-image-to-convert"
  );
  const nameCurrencyToConvert = document.querySelector(
    "#name-currency-to-convert > span"
  );

  const convertedCurrencyImage = document.querySelector(
    ".converted-currency-image"
  );
  const nameConvertedCurrency = document.querySelector(
    "#name-converted-currency > span"
  );

  switch (selectToConvert.value) {
    case "real":
      currencyImageToConvert.src = "./assets/real.png";
      nameCurrencyToConvert.innerHTML = "Real (BRL)";
      break;

    case "dolar":
      currencyImageToConvert.src = "./assets/dolar.png";
      nameCurrencyToConvert.innerHTML = "Dólar EUA (USD)";
      break;

    case "euro":
      currencyImageToConvert.src = "./assets/euro.png";
      nameCurrencyToConvert.innerHTML = "Euro (EUR)";
      break;

    case "libra":
      currencyImageToConvert.src = "./assets/libra.png";
      nameCurrencyToConvert.innerHTML = "Libra (GBP)";
      break;
  }

  switch (selectConverted.value) {
    case "real":
      convertedCurrencyImage.src = "./assets/real.png";
      nameConvertedCurrency.innerHTML = "Real (BRL)";
      break;

    case "dolar":
      convertedCurrencyImage.src = "./assets/dolar.png";
      nameConvertedCurrency.innerHTML = "Dólar EUA (USD)";
      break;

    case "euro":
      convertedCurrencyImage.src = "./assets/euro.png";
      nameConvertedCurrency.innerHTML = "Euro (EUR)";
      break;

    case "libra":
      convertedCurrencyImage.src = "./assets/libra.png";
      nameConvertedCurrency.innerHTML = "Libra (GBP)";
      break;
  }

  convertCurrency();
}

function exchangeCurrencies() {
  let valueToconvert = selectToConvert.value;
  let valueConverted = selectConverted.value;

  selectToConvert.value = valueConverted;
  selectConverted.value = valueToconvert;

  changeCurrency();
}

changeCurrency();

convertButton.addEventListener("click", convertCurrency);
switchButton.addEventListener("click", exchangeCurrencies);
selectToConvert.addEventListener("change", changeCurrency);
selectConverted.addEventListener("change", changeCurrency);
