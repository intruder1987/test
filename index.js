const selectedCart = [
    { price: 20 },
    { price: 45 },
    { price: 67 },
    { price: 1305 }
];

const USDTORUBLES = 63.36;
const USDTOEUROS = 0.93;
const USDTOPOUNDS = 0.79;
const USDTOYENS = 113.52;

var Shop = (function(){
    var currency = new Currency();
    return {
        changeCurrency: function (c) {
            currency = c instanceof Currency ? c : new Currency();
            return this;
        },
        getTotalCardPrice: function (data) {
            if (!Array.isArray(data)) {
                return 0;
            }

            return data.reduce(function(sum, item){
                if (item && typeof item.price === 'number' && !isNaN(item.price) && isFinite(item.price)) { //проверка на число с отсечением NaN и Infinity
                    sum += currency.convertUsdTo(item.price);
                }
                return sum;
            }, 0);
        }
    }
})();

function Currency() {};
Currency.prototype.convertUsdTo = function(price){
    return price; // так как долары по умолчанию, то тут нет преобразований;
};

function CurrencyRubles() {};
CurrencyRubles.prototype = Object.create(Currency.prototype);
CurrencyRubles.prototype.convertUsdTo = function(price){
    return price * USDTORUBLES; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

function CurrencyEuros() {};
CurrencyEuros.prototype = Object.create(Currency.prototype);
CurrencyEuros.prototype.convertUsdTo = function(price){
    return price * USDTOEUROS; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

function CurrencyPound() {};
CurrencyPound.prototype = Object.create(Currency.prototype);
CurrencyPound.prototype.convertUsdTo = function(price){
    return price * USDTOPOUNDS; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

function CurrencyYens() {};
CurrencyYens.prototype = Object.create(Currency.prototype);
CurrencyYens.prototype.convertUsdTo = function(price){
    return price * USDTOYENS; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

var totalCartPrice = {
    rubles: Shop.changeCurrency(new CurrencyRubles()).getTotalCardPrice(selectedCart),
    euros: Shop.changeCurrency(new CurrencyEuros()).getTotalCardPrice(selectedCart),
    dollars: Shop.changeCurrency(new Currency()).getTotalCardPrice(selectedCart),
    pounds: Shop.changeCurrency(new CurrencyPound()).getTotalCardPrice(selectedCart),
    yens: Shop.changeCurrency(new CurrencyYens()).getTotalCardPrice(selectedCart)
};

console.log(totalCartPrice);