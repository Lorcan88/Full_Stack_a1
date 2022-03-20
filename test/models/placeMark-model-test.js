import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlaceMarks, bart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("PlaceMark Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placeMarkStore.deleteAllPlaceMarks();
    for (let i = 0; i < testPlaceMarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaceMarks[i] = await db.placeMarkStore.addPlaceMark(testPlaceMarks[i]);
    }
  });

  test("create a placeMark", async () => {
    const placeMark = await db.placeMarkStore.addPlaceMark(bart);
    assertSubset(bart, placeMark);
    assert.isDefined(placeMark._id);
  });

  test("delete all placeMarks", async () => {
    let returnedPlaceMarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(returnedPlaceMarks.length, 3);
    await db.placeMarkStore.deleteAllPlaceMarks();
    returnedPlaceMarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(returnedPlaceMarks.length, 0);
  });

  test("get a placeMark - success", async () => {
    const placeMark = await db.placeMarkStore.addPlaceMark(bart);
    const returnedPlaceMark = await db.placeMarkStore.getPlaceMarkById(placeMark._id);
    assertSubset(bart, placeMark);
  });

  test("delete One PlaceMark - success", async () => {
    const id = testPlaceMarks[0]._id;
    await db.placeMarkStore.deletePlaceMarkById(id);
    const returnedPlaceMarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(returnedPlaceMarks.length, testPlaceMarks.length - 1);
    const deletedPlaceMark = await db.placeMarkStore.getPlaceMarkById(id);
    assert.isNull(deletedPlaceMark);
  });

  test("get a placeMark - bad params", async () => {
    assert.isNull(await db.placeMarkStore.getPlaceMarkById(""));
    assert.isNull(await db.placeMarkStore.getPlaceMarkById());
  });

  test("delete One PlaceMark - fail", async () => {
    await db.placeMarkStore.deletePlaceMarkById("bad-id");
    const allPlaceMarks = await db.placeMarkStore.getAllPlaceMarks();
    assert.equal(testPlaceMarks.length, allPlaceMarks.length);
  });
});
