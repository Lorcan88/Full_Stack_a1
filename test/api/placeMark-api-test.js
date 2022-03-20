import { assert } from "chai";
import { placeMarkService } from "./placeMark-service.js";
import { assertSubset } from "../test-utils.js";

import { bart, waterford, testPlaceMarks } from "../fixtures.js";

suite("placeMark API tests", () => {
  let user = null;

  setup(async () => {
    await placeMarkService.deleteAllPlaceMarks();
    await placeMarkService.deleteAllUsers();
    user = await placeMarkService.createUser(bart);
    waterford.userid = user._id;
  });

  teardown(async () => {});

  test("create placeMark", async () => {
    const returnedPlaceMark = await placeMarkService.createPlaceMark(waterford);
    assert.isNotNull(returnedPlaceMark);
    assertSubset(waterford, returnedPlaceMark);
  });

  test("delete a placeMark", async () => {
    const placeMark = await placeMarkService.createPlaceMark(waterford);
    const response = await placeMarkService.deletePlaceMark(placeMark._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaceMark = await placeMarkService.getPlaceMark(placeMark.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No PlaceMark with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placeMarks", async () => {
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      testPlaceMarks[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createPlaceMark(testPlaceMarks[i]);
    }
    let returnedLists = await placeMarkService.getAllPlaceMarks();
    assert.equal(returnedLists.length, testPlaceMarks.length);
    await placeMarkService.deleteAllPlaceMarks();
    returnedLists = await placeMarkService.getAllPlaceMarks();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant placeMark", async () => {
    try {
      const response = await placeMarkService.deletePlaceMark("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No PlaceMark with this id", "Incorrect Response Message");
    }
  });
});
