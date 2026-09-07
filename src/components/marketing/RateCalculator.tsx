"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/AppIcon";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

// Placeholder pricing assumptions for the estimate shown below.
// TODO: replace with Merchly's actual figures once pricing is finalized.
// "You cover it" = interchange-plus, modeled here as IC + 50bps.
const MERCHANT_PAYS_RATE = 0.0269;
// "Customer covers it" = cash discount / dual pricing — the surcharge
// offsets the processing cost, so the merchant's net fee is effectively $0.
const CUSTOMER_PAYS_RATE = 0;

type FeeModel = "merchant-pays" | "customer-pays";

// Effective rate = every fee on the statement (discount rate, PCI, statement,
// batch, monthly minimum, etc.) divided by volume — not the headline rate a
// processor quotes. Bound the result to a sane display range either way.
const MIN_DISPLAYED_RATE = 0.5;
const MAX_DISPLAYED_RATE = 15;
const MIN_VOLUME = 1000;
const MAX_VOLUME = 250000;

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
  const [feeModel, setFeeModel] = useState<FeeModel>("merchant-pays");
  const [statementSource, setStatementSource] = useState<"manual" | "calculated">(
    "manual",
  );
  const [showRateHelper, setShowRateHelper] = useState(false);
  const [feesPaid, setFeesPaid] = useState("");
  const [volumeProcessed, setVolumeProcessed] = useState("");

  const feesPaidNumber = Number(feesPaid);
  const volumeProcessedNumber = Number(volumeProcessed);
  const canCalculate = feesPaidNumber > 0 && volumeProcessedNumber > 0;

  const handleCalculateEffectiveRate = () => {
    if (!canCalculate) return;
    const computedRate = (feesPaidNumber / volumeProcessedNumber) * 100;
    const clampedRate = Math.min(
      Math.max(computedRate, MIN_DISPLAYED_RATE),
      MAX_DISPLAYED_RATE,
    );
    const clampedVolume = Math.min(
      Math.max(volumeProcessedNumber, MIN_VOLUME),
      MAX_VOLUME,
    );
    setCurrentRate(Number(clampedRate.toFixed(1)));
    setMonthlyVolume(Math.round(clampedVolume));
    setStatementSource("calculated");
    setShowRateHelper(false);
    setFeesPaid("");
    setVolumeProcessed("");
  };

  const { currentCost, merchlyCost, monthlySavings, annualSavings, savingsPercent } =
    useMemo(() => {
      const currentCost = monthlyVolume * (currentRate / 100);
      const merchlyRate =
        feeModel === "customer-pays" ? CUSTOMER_PAYS_RATE : MERCHANT_PAYS_RATE;
      const merchlyCost = monthlyVolume * merchlyRate;
      const monthlySavings = Math.max(currentCost - merchlyCost, 0);
      const savingsPercent =
        currentCost > 0 ? Math.round((monthlySavings / currentCost) * 100) : 0;
      return {
        currentCost,
        merchlyCost,
        monthlySavings,
        annualSavings: monthlySavings * 12,
        savingsPercent,
      };
    }, [monthlyVolume, currentRate, feeModel]);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full">
      <div className="card-body">
        <span className="badge badge-soft badge-secondary badge-sm w-fit">
          Live estimate
        </span>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-2">
          {/* Inputs */}
          <div>
            <h3 className="card-title font-heading">Estimate your savings</h3>
            <p className="text-sm text-base-content/70">
              A quick estimate — final pricing depends on your business type
              and processing history.
            </p>

            <fieldset className="fieldset mt-4 px-0">
              <label className="label" htmlFor="feeModelMerchantPays">
                Who covers the processing fee?
              </label>
              <div className="join w-full">
                <input
                  id="feeModelMerchantPays"
                  type="radio"
                  name="feeModel"
                  className="join-item btn btn-sm grow"
                  aria-label="I'll cover the fee"
                  checked={feeModel === "merchant-pays"}
                  onChange={() => setFeeModel("merchant-pays")}
                />
                <input
                  id="feeModelCustomerPays"
                  type="radio"
                  name="feeModel"
                  className="join-item btn btn-sm grow"
                  aria-label="Pass it to my customers"
                  checked={feeModel === "customer-pays"}
                  onChange={() => setFeeModel("customer-pays")}
                />
              </div>
              <p className="text-xs text-base-content/60 mt-1">
                {feeModel === "merchant-pays"
                  ? "You absorb the processing cost — priced at interchange plus a flat markup."
                  : "A compliant cash-discount program shifts the fee to the customer at checkout."}
              </p>
            </fieldset>

            <fieldset className="fieldset mt-2 px-0">
              <div className="flex items-center justify-between gap-2">
                <label className="label" htmlFor="monthlyVolume">
                  Average monthly card volume
                </label>
                {statementSource === "calculated" && (
                  <span className="badge badge-soft badge-success badge-xs">
                    From your statement
                  </span>
                )}
              </div>
              <input
                id="monthlyVolume"
                type="range"
                min={MIN_VOLUME}
                max={MAX_VOLUME}
                step={1000}
                value={monthlyVolume}
                onChange={(event) => {
                  setMonthlyVolume(Number(event.target.value));
                  setStatementSource("manual");
                }}
                className="range range-primary range-sm"
              />
              <div className="text-right font-semibold tabular-nums">
                {formatCurrency(monthlyVolume)}
              </div>
            </fieldset>

            <fieldset className="fieldset px-0">
              <div className="flex items-center justify-between gap-2">
                <label className="label" htmlFor="currentRate">
                  Your current effective rate (%)
                </label>
                {statementSource === "calculated" && (
                  <span className="badge badge-soft badge-success badge-xs">
                    Calculated from your statement
                  </span>
                )}
              </div>
              <input
                id="currentRate"
                type="range"
                min={MIN_DISPLAYED_RATE}
                max={MAX_DISPLAYED_RATE}
                step={0.1}
                value={currentRate}
                onChange={(event) => {
                  setCurrentRate(Number(event.target.value));
                  setStatementSource("manual");
                }}
                className="range range-secondary range-sm"
              />
              <div className="text-right font-semibold tabular-nums">
                {currentRate.toFixed(1)}%
              </div>

              {!showRateHelper ? (
                <button
                  type="button"
                  onClick={() => setShowRateHelper(true)}
                  className="btn btn-link btn-xs justify-start px-0 mt-1 no-underline hover:underline"
                >
                  <Icon icon="lucide:circle-help" className="h-3.5 w-3.5" aria-hidden="true" />
                  Unsure of your effective rate? We can help
                </button>
              ) : (
                <div className="mt-2 rounded-box border border-base-300 bg-base-200 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <Icon
                        icon="lucide:info"
                        className="h-4 w-4 text-info shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-xs text-base-content/70">
                        Most processors advertise a low headline rate, but
                        that number rarely matches what actually leaves your
                        bank account. PCI fees, statement fees, batch fees,
                        and monthly minimums quietly push your real
                        effective rate higher. Grab your last statement and
                        enter your total volume and total fees below —
                        we&apos;ll calculate your true rate and update the
                        estimate.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRateHelper(false)}
                      aria-label="Close"
                      className="btn btn-ghost btn-xs btn-circle shrink-0"
                    >
                      <Icon icon="lucide:x" className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <label className="label mt-3" htmlFor="volumeProcessed">
                    Total volume processed last month
                  </label>
                  <label className="input input-sm w-full">
                    $
                    <input
                      id="volumeProcessed"
                      type="number"
                      min={0}
                      step={1}
                      inputMode="decimal"
                      placeholder="25,000"
                      value={volumeProcessed}
                      onChange={(event) =>
                        setVolumeProcessed(event.target.value)
                      }
                      className="tabular-nums"
                    />
                  </label>

                  <label className="label mt-2" htmlFor="feesPaid">
                    Total fees paid last month
                  </label>
                  <label className="input input-sm w-full">
                    $
                    <input
                      id="feesPaid"
                      type="number"
                      min={0}
                      step={1}
                      inputMode="decimal"
                      placeholder="875"
                      value={feesPaid}
                      onChange={(event) => setFeesPaid(event.target.value)}
                      className="tabular-nums"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleCalculateEffectiveRate}
                    disabled={!canCalculate}
                    className="btn btn-secondary btn-sm w-full mt-3"
                  >
                    Calculate my effective rate
                  </button>
                </div>
              )}
            </fieldset>
          </div>

          {/* Results */}
          <div className="flex flex-col lg:border-l lg:border-base-300 lg:pl-8">
            <div className="stats stats-vertical bg-base-200 border border-base-300">
              <div className="stat px-4 py-3">
                <div className="stat-title text-xs">Current cost</div>
                <div className="stat-value text-lg tabular-nums">
                  {formatCurrency(currentCost)}
                </div>
                <div className="stat-desc text-xs">per month</div>
              </div>
              <div className="stat px-4 py-3">
                <div className="stat-title text-xs">With Merchly</div>
                <div className="stat-value text-lg text-secondary tabular-nums">
                  {formatCurrency(merchlyCost)}
                </div>
                <div className="stat-desc text-xs">
                  {feeModel === "merchant-pays"
                    ? "per month"
                    : "you pay $0/mo"}
                </div>
              </div>
              <div className="stat px-4 py-3">
                <div className="stat-title text-xs">Potential savings</div>
                <div className="stat-value text-lg text-primary tabular-nums">
                  {formatCurrency(annualSavings)}
                </div>
                <div className="stat-desc text-xs">
                  per year ({formatCurrency(monthlySavings)}/mo)
                </div>
              </div>
            </div>

            {savingsPercent > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-base-content/60">
                  <span>Cost reduction vs. your current rate</span>
                  <span className="font-semibold tabular-nums">
                    {savingsPercent}%
                  </span>
                </div>
                <progress
                  className="progress progress-primary w-full mt-1"
                  value={savingsPercent}
                  max={100}
                />
              </div>
            )}

            <div className="mt-auto pt-6">
              <LeadModalTrigger
                source="rate-calculator"
                className="btn btn-primary btn-block"
              >
                <Icon icon="lucide:phone-call" className="h-4 w-4" aria-hidden="true" />
                Get my actual custom rate
              </LeadModalTrigger>
              <p className="text-xs text-base-content/60 text-center mt-2">
                This is only a ballpark estimate. Talk to us for pricing
                built around your real statement and processing history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
