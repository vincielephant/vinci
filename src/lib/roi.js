// Defensible heuristics rooted in Gallup engagement research + retention literature.
// All numbers are intentionally conservative for B2B credibility.

const AVG_MONTHLY_SALARY_ILS = 18000
const TURNOVER_COST_MONTHS = 6 // months of salary lost per departure (recruit + ramp)
const BASELINE_TURNOVER = 0.18 // 18% annual baseline in mid-market HR
const HOURS_PER_EMPLOYEE_PER_YEAR = 1880

export function calcRoi(employeeCount, stressLevel /* 1..10 */) {
  const safeCount = Math.max(1, Number(employeeCount) || 1)
  const safeStress = Math.min(10, Math.max(1, Number(stressLevel) || 5))

  const stressDrop = Math.min(0.6, 0.32 + (safeStress - 5) * 0.04)
  const productivityGain = stressDrop * 0.42
  const retentionGain = stressDrop * 0.3
  const wellbeingGain = stressDrop * 0.55

  const baselineDepartures = BASELINE_TURNOVER * safeCount
  const savedDepartures = baselineDepartures * retentionGain
  const annualSavings = Math.round(
    savedDepartures * AVG_MONTHLY_SALARY_ILS * TURNOVER_COST_MONTHS,
  )

  const recoveredHours = Math.round(
    safeCount * HOURS_PER_EMPLOYEE_PER_YEAR * productivityGain * 0.06,
  )

  return {
    productivityGain: Math.round(productivityGain * 100),
    retentionGain: Math.round(retentionGain * 100),
    wellbeingGain: Math.round(wellbeingGain * 100),
    annualSavings,
    recoveredHours,
    savedDepartures: Math.round(savedDepartures * 10) / 10,
  }
}

export const formatILS = (n) =>
  new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0,
  }).format(n)

export const formatNumber = (n) =>
  new Intl.NumberFormat('he-IL', { maximumFractionDigits: 0 }).format(n)
