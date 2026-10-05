// Pushpak card rules table. Every figure comes from the source listed for that card.
// "fixed" = value per point published by the bank. "estimate" = Pushpak's assumption, always labelled.
// Verified on the date in VERIFIED. Re-check sources before relying on these figures.

const VERIFIED = "5 Oct 2026";

const CARDS = {
  "hsbc-travelone": {
    name: "HSBC TravelOne",
    currency: "reward points",
    type: "points",
    routes: [
      { name: "Accor ALL hotel points (1:1 transfer)", kind: "estimate", low: 1.8, high: 2.0, minPoints: 0,
        note: "Accor ALL gives 2,000 points = EUR 40 off an Accor stay, so the rupee value moves with the euro. Only useful if you stay at Accor hotels." },
      { name: "Airline miles (1:1 for most partners)", kind: "estimate", low: 0.5, high: 1.0, minPoints: 0,
        note: "Transfers happen instantly in the HSBC India app. A few partners use worse ratios. Value depends on the flight, seat availability and taxes." }
    ],
    cardNote: "Points are valid for 3 years. Pushpak does not yet value HSBC's Travel with Points portal because its per-point rate for TravelOne was not confirmed.",
    sources: [
      "https://www.hsbc.co.in/credit-cards/products/travelone/rewards/",
      "https://hsbc.co.in/content/dam/hsbc/in/documents/combined-rewards-tc-final-17th-dec.pdf"
    ]
  },
  "axis-horizon": {
    name: "Axis Bank Horizon",
    currency: "EDGE Miles",
    type: "points",
    routes: [
      { name: "Flights and hotels on Axis Travel EDGE", kind: "fixed", low: 1.0, high: 1.0, minPoints: 500,
        note: "Axis states 1 EDGE Mile = Rs 1 on Travel EDGE. Minimum 500 EDGE Miles." },
      { name: "Airline or hotel partner transfer (1:1 for most partners)", kind: "estimate", low: 0.5, high: 1.0, minPoints: 500,
        note: "Some partners need 2 EDGE Miles per partner mile. Annual transfer caps apply. Value depends on the booking, seat availability and taxes." }
    ],
    cardNote: "Check the transfer fee and current partner list in the Axis miles transfer page before converting.",
    sources: [
      "https://www.axis.bank.in/cards/credit-card/axis-horizon-credit-card",
      "https://www.axisbank.com/docs/default-source/ld/terms-and-conditions-for-horizon-credit-card.pdf"
    ]
  },
  "hdfc-marriott-bonvoy": {
    name: "Marriott Bonvoy HDFC Bank",
    currency: "Marriott Bonvoy points",
    type: "points",
    routes: [
      { name: "Marriott hotel nights", kind: "estimate", low: 0.5, high: 1.0, minPoints: 0,
        note: "Points move to your Marriott Bonvoy account after each billing cycle (allow up to 12 weeks). Value per point depends on the hotel and dates." }
    ],
    cardNote: "Only points showing in your Marriott Bonvoy account can be redeemed, and only within Marriott Bonvoy.",
    sources: [
      "https://hdfc.bank.in/credit-cards/marriott-bonvoy-credit-card",
      "https://www.business-standard.com/amp/finance/personal-finance/marriott-bonvoy-hdfc-bank-credit-card-5-times-reward-points-on-every-spend-124101500485_1.html"
    ]
  },
  "hdfc-regalia-gold": {
    name: "HDFC Bank Regalia Gold",
    currency: "reward points",
    type: "points",
    routes: [
      { name: "Exclusive Gold Catalogue on SmartBuy", kind: "fixed", low: 0.65, high: 0.65, minPoints: 0,
        note: "Products from a select premium catalogue only. Worth this only if you want something in it." },
      { name: "Flights and hotels on SmartBuy", kind: "fixed", low: 0.5, high: 0.5, minPoints: 0,
        note: "Points can cover up to 70% of a booking; the rest goes on the card. Capped at 50,000 points a month." },
      { name: "Products and vouchers", kind: "fixed", low: 0.35, high: 0.35, minPoints: 0,
        note: "HDFC states up to Rs 0.35 per point." },
      { name: "Airmiles conversion", kind: "estimate", low: 0.25, high: 0.5, minPoints: 0,
        note: "HDFC converts at up to 0.5 airmile per point. Rupee value depends on the flight, seats and taxes." },
      { name: "Statement credit", kind: "fixed", low: 0.15, high: 0.2, minPoints: 0,
        note: "HDFC documents list Rs 0.15 to Rs 0.20 per point. Capped at 50,000 points a month." }
    ],
    cardNote: "Redemptions are made on HDFC SmartBuy or NetBanking.",
    sources: [
      "https://www.hdfc.bank.in/credit-cards/regalia-gold-credit-card",
      "https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/personal-banking/discover-products/cards/credit-cards/regalia-gold-credit-card/reward-points-redemption-through-smartbuy.pdf"
    ]
  },
  "hdfc-tata-neu-infinity": {
    name: "Tata Neu Infinity HDFC Bank",
    currency: "NeuCoins",
    type: "points",
    routes: [
      { name: "Tata Neu app and partner Tata brands", kind: "fixed", low: 1.0, high: 1.0, minPoints: 0,
        note: "1 NeuCoin = Rs 1 on Tata Neu. Not usable on Air India, Tata Play or bill payments on Tata Neu." }
    ],
    cardNote: "NeuCoins are valid for 365 days, and validity extends each time you earn or use them. Value exists only inside the Tata ecosystem.",
    sources: [
      "https://hdfcbank.com/personal/pay/cards/credit-cards/tata-neu-infinity-hdfc-bank-credit-card/value-chart"
    ]
  },
  "sbi-cashback": {
    name: "CASHBACK SBI Card",
    currency: "cashback",
    type: "cashback",
    routes: [],
    cardNote: "This card earns cashback, not points. Cashback is credited to the card account automatically within two working days of statement generation and does not expire. There is nothing to redeem.",
    sources: [
      "https://www.sbicard.com/en/faq/cashback-sbi-card-faq.page"
    ]
  }
};

function valueRoutes(card, points) {
  return card.routes.map(r => {
    const eligible = points >= (r.minPoints || 0);
    return {
      name: r.name, kind: r.kind, note: r.note, eligible,
      minPoints: r.minPoints || 0,
      low: eligible ? Math.floor(points * r.low) : 0,
      high: eligible ? Math.floor(points * r.high) : 0
    };
  });
}

module.exports = { CARDS, VERIFIED, valueRoutes };
