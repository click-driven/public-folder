function calculateLTV() {
  const revenue = parseFloat(document.getElementById('annualRevenue').value) || 0;
  const cost = parseFloat(document.getElementById('productCost').value) || 0;
  const cac = parseFloat(document.getElementById('cac').value) || 0;
  const churnRate = (parseFloat(document.getElementById('churnRate').value) || 0) / 100;
  const discountRate = (parseFloat(document.getElementById('discountRate').value) || 0) / 100;
  const years = parseInt(document.getElementById('timeHorizon').value) || 1;

  const annualMargin = revenue - cost;

  // 1. Simple LTV Formula (Infinite Horizon Constant Churn)
  let simpleLTV = 0;
  if (churnRate > 0) {
    simpleLTV = (annualMargin / churnRate) - cac;
  }

  // 2. Net Present Value LTV (Discounted Cash Flow over specific year horizon)
  let npvLTV = -cac; // Initial investment / acquisition cost
  let activeProbability = 1.0;

  for (let year = 1; year <= years; year++) {
    activeProbability *= (1 - churnRate); // Retention probability in year t
    const expectedProfit = annualMargin * activeProbability;
    const presentValue = expectedProfit / Math.pow(1 + discountRate, year);
    npvLTV += presentValue;
  }

  // 3. LTV : CAC Ratio
  const ltvCacRatio = cac > 0 ? (npvLTV / cac) : 0;

  // Display results
  document.getElementById('simpleLTV').textContent = '$' + simpleLTV.toFixed(2);
  document.getElementById('npvLTV').textContent = '$' + npvLTV.toFixed(2);
  document.getElementById('ltvCacRatio').textContent = ltvCacRatio.toFixed(1) + 'x';
  
  document.getElementById('results').style.display = 'block';
}

// Automatically calculate on initial load
window.onload = calculateLTV;