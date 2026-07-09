import { describe, expect, it } from "vitest"
import { ZodError } from "zod"

import { getPriceChange, parseKlines } from "./crypto"

describe("parseKlines", () => {
  it("maps open time and close price from Binance rows", () => {
    const raw = [
      [1499040000000, "0.016", "0.8", "0.015", "0.77", "148976", 1499644799999],
      [1499644800000, "0.77", "0.8", "0.75", "0.78", "200000", 1500249599999],
    ]

    expect(parseKlines(raw)).toEqual([
      { time: 1499040000000, close: 0.77 },
      { time: 1499644800000, close: 0.78 },
    ])
  })

  it("rejects malformed Binance rows", () => {
    expect(() =>
      parseKlines([["not-a-number", "0.1", "0.2", "0.3", "0.4"]]),
    ).toThrow(ZodError)
  })

  it("rejects non-array responses", () => {
    expect(() => parseKlines({ data: [] })).toThrow(ZodError)
  })
})

describe("getPriceChange", () => {
  it("computes absolute and percent change", () => {
    const points = [
      { time: 1, close: 100 },
      { time: 2, close: 110 },
    ]

    expect(getPriceChange(points)).toEqual({
      change: 10,
      percent: 10,
    })
  })
})
