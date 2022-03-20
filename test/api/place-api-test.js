import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placeMarkService } from "./placeMark-service.js";
import { bart, cork, testPlaceMarks, testPlaces, river } from "../fixtures.js";

suite("Place API tests", () => {
  let user = null;
  let kerry = null;

  setup(async () => {
    await placeMarkService.deleteAllPlaceMarks();
    await placeMarkService.deleteAllUsers();
    await placeMarkService.deleteAllPlaces();
    user = await placeMarkService.createUser(bart);
    cork.userid = user._id;
    kerry = await placeMarkService.createPlaceMark(cork);
  });

  teardown(async () => {});

  test("create place", async () => {
    const returnedPlace = await placeMarkService.createPlace(kerry._id, river);
    assertSubset(river, returnedPlace);
  });

  test("create Multiple places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createPlace(kerry._id, testPlaces[i]);
    }
    const returnedPlaces = await placeMarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await placeMarkService.getPlace(returnedPlaces[i]._id);
      assertSubset(place, returnedPlaces[i]);
    }
  });

  test("Delete PlaceApi", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createPlace(kerry._id, testPlaces[i]);
    }
    let returnedPlaces = await placeMarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await placeMarkService.deletePlace(returnedPlaces[i]._id);
    }
    returnedPlaces = await placeMarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("denormalized placeMark", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createPlace(kerry._id, testPlaces[i]);
    }
    const returnedPlaceMark = await placeMarkService.getPlaceMark(kerry._id);
    assert.equal(returnedPlaceMark.places.length, testPlaces.length);
    for (let i = 0; i < testPlaces.length; i += 1) {
      assertSubset(testPlaces[i], returnedPlaceMark.places[i]);
    }
  });
});
