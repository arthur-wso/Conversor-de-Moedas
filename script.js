const convertButton = document.querySelector(".convert-button")
const selectCurrency = document.querySelector(".info-input")

async function ConvertValues() {
    const inputCurrencyValue = document.querySelector(".input-number").value
    const currencyValueToConvert = document.querySelector(".results-value-to-convert") // Valor a converter
    const currencyValueConverted = document.querySelector(".results-value") // Valor Convertido

    const dataBase = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,JPY-BRL").then(response => response.json())

    const dolarValue = dataBase.USDBRL.high
    const euroValue = dataBase.EURBRL.high
    const bitcoinValue = dataBase.BTCBRL.high
    const ieneValue = dataBase.JPYBRL.high

        if (selectCurrency.value == "bitcoin") {
            currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "XBT", 
                minimumFractionDigits: 8,
                maximumFractionDigits: 8
            }).format(inputCurrencyValue / bitcoinValue).replace("XBT", "₿");
        }

    if (selectCurrency.value == "iene") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY"
        }).format(inputCurrencyValue * ieneValue)
    }
 
    // Se o select estiver em Dólar
    if (selectCurrency.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarValue)
    }

    // Se o select estiver em Euro
    if (selectCurrency.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroValue)
    }

    // Aqui formatamos o valor que o usuário digitou (em Real) para aparecer bonitinho na tela
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue)
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.getElementById("img-currency")

        if (selectCurrency.value == "bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"
    }

    if (selectCurrency.value == "iene") {
        currencyName.innerHTML = "Iene Japonês"
        currencyImage.src = "./assets/japan_flag.png"
    }

    if (selectCurrency.value == "dolar") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/Flag_of_the_United_States.png"
    }

    if (selectCurrency.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/Flag_of_Europe.png"
    }

    ConvertValues()
}

selectCurrency.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", ConvertValues)
