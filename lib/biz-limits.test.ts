import { afterEach, describe, expect, it, vi } from "vitest";
import {
  charLength,
  clampList,
  clampText,
  isValidCouponTitle,
} from "./biz-limits";

afterEach(() => vi.restoreAllMocks());

describe("charLength", () => {
  it("counts Hangul and emoji as one character each", () => {
    expect(charLength("알림톡")).toBe(3);
    expect(charLength("🎁쿠폰")).toBe(3);
  });
});

describe("clampText", () => {
  it("returns text unchanged when within the limit", () => {
    expect(clampText("주문 완료", 5)).toBe("주문 완료");
  });

  it("truncates with an ellipsis and warns when over the limit", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(clampText("가나다라마바", 4, "title")).toBe("가나다…");
    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][0]).toContain("title exceeds 4");
  });

  it("passes undefined through", () => {
    expect(clampText(undefined, 3)).toBeUndefined();
  });
});

describe("clampList", () => {
  it("drops entries past the max and warns", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(clampList([1, 2, 3], 2, "buttons")).toEqual([1, 2]);
    expect(warn).toHaveBeenCalledOnce();
  });

  it("treats undefined as empty", () => {
    expect(clampList(undefined, 2)).toEqual([]);
  });
});

describe("isValidCouponTitle", () => {
  it.each([
    "3,000원 할인 쿠폰",
    "500원 할인 쿠폰",
    "10% 할인 쿠폰",
    "100% 할인 쿠폰",
    "배송비 할인 쿠폰",
    "아메리카노 무료 쿠폰",
    "사이즈 UP 쿠폰",
  ])("accepts %s", (title) => {
    expect(isValidCouponTitle(title)).toBe(true);
  });

  it.each([
    "할인 쿠폰",
    "0% 할인 쿠폰",
    "101% 할인 쿠폰",
    "3000원 할인쿠폰",
    "아메리카노라떼세트 무료 쿠폰",
  ])("rejects %s", (title) => {
    expect(isValidCouponTitle(title)).toBe(false);
  });
});
