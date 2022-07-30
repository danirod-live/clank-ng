import test from "node:test";
import assert from "node:assert";
import { VERSION } from "../src/index.js";

test("VERSION is a string", () => {
  assert.equal(typeof VERSION, "string");
});
