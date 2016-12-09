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
            currency = c;
            return this;
        },
        getTotalCardPrice: function (data) {
            if (!data || !data.length) {
                return 0;
            }

            var sum = 0;
            data.forEach(function(item){
                sum += currency.convertUsdTo(item.price);
            });
            return sum;
        }
    }
})();

function Currency() {};
Currency.prototype.convertUsdTo = function(price){
    return price; // так как долары по умолчанию, то тут нет преобразований;
};

function CurrencyRubles() {};
CurrencyRubles.prootype = Object.create(Currency.prototype);
CurrencyRubles.prototype.convertUsdTo = function(price){
    return price * USDTORUBLES; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

function CurrencyEuros() {};
CurrencyEuros.prootype = Object.create(Currency.prototype);
CurrencyEuros.prototype.convertUsdTo = function(price){
    return price * USDTOEUROS; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

function CurrencyPound() {};
CurrencyPound.prootype = Object.create(Currency.prototype);
CurrencyPound.prototype.convertUsdTo = function(price){
    return price * USDTOPOUNDS; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

function CurrencyYens() {};
CurrencyYens.prootype = Object.create(Currency.prototype);
CurrencyYens.prototype.convertUsdTo = function(price){
    return price * USDTOYENS; // здесь я делаю якобы конвертацию, но на самом деле просто умножаю на константу;
};

var dollars = new Currency();
var rubles = new CurrencyRubles();
var euros = new CurrencyEuros();
var pounds = new CurrencyPound();
var yens = new CurrencyYens();

var totalCartPrice = {
    rubles: Shop.changeCurrency(rubles).getTotalCardPrice(selectedCart),
    euros: Shop.changeCurrency(euros).getTotalCardPrice(selectedCart),
    dollars: Shop.changeCurrency(dollars).getTotalCardPrice(selectedCart),
    pounds: Shop.changeCurrency(pounds).getTotalCardPrice(selectedCart),
    yens: Shop.changeCurrency(yens).getTotalCardPrice(selectedCart)
};

console.log(totalCartPrice);