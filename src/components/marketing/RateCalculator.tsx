"use client";

import { useMemo, useState } from "react";

// Placeholder pricing assumption for the estimate shown below.
// TODO: replace with Merchly's actual effective-rate figure once pricing is finalized.
const MERCHLY_ESTIMATED_RATE = 0.0269;

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function RateCalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState(25000);
  const [currentRate, setCurrentRate] = useState(3.5);

  const { currentCost, merchlyCost, monthlySavings, annualSavings } =
    useMemo(() => {
      const currentCost = monthlyVolume * (currentRate / 100);
      const merchlyCost = monthlyVolume * MERCHLY_ESTIMATED_RATE;
      const monthlySavings = Math.max(currentCost - merchlyCost, 0);
      return {
        currentCost,
        merchlyCost,
        monthlySavings,
        annualSavings: monthlySavings * 12,
      };
    }, [monthlyVolume, currentRate]);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h3 className="card-title font-heading">Estimate Your Savings</h3>
        <p className="text-sm text-base-content/70">
          A quick estimate — final pricing depends on your business type and
          processing history.
        </p>

        <div className="form-control mt-4">
          <label className="label" htmlFor="monthlyVolume">
            <span className="label-text">Average monthly card volume</span>
          </label>
          <input
            id="monthlyVolume"
            type="range"
            min={1000}
            max={250000}
            step={1000}
            value={monthlyVolume}
            onChange={(event) => setMonthlyVolume(Number(event.target.value))}
            className="range range-primary"
          />
          <div className="text-right font-semibold">
            {formatCurrency(monthlyVolume)}
          </div>
        </div>

        <div className="form-control mt-2">
          <label className="label" htmlFor="currentRate">
            <span className="label-text">Your current effective rate (%)</span>
          </label>
          <input
            id="currentRate"
            type="range"
            min={1.5}
            max={6}
            step={0.1}
            value={currentRate}
            onChange={(event) => setCurrentRate(Number(event.target.value))}
            className="range range-secondary"
          />
          <div className="text-right font-semibold">{currentRate.toFixed(1)}%</div>
        </div>

        <div className="stats stats-vertical sm:stats-horizontal mt-6 shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Estimated current cost</div>
            <div className="stat-value text-lg">{formatCurrency(currentCost)}</div>
            <div className="stat-desc">per month</div>
          </div>
          <div className="stat">
            <div className="stat-title">Estimated with Merchly</div>
            <div className="stat-value text-lg text-secondary">
              {formatCurrency(merchlyCost)}
            </div>
            <div className="stat-desc">per month</div>
          </div>
          <div className="stat">
            <div className="stat-title">Potential savings</div>
            <div className="stat-value text-lg text-primary">
              {formatCurrency(annualSavings)}
            </div>
            <div className="stat-desc">
              per year ({formatCurrency(monthlySavings)}/mo)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
