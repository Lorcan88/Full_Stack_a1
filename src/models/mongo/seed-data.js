export const seedData = {
  admin: {
    _model: "Admin",
    maggie: {
      firstName: "Maggie",
      lastName: "Simpson",
      email: "maggie@simpson.com",
      password: "secret",
    },
  },

  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  placeMark: {
    _model: "PlaceMark",
    cork: {
      title: "Cork",
      userid: "->users.bart",
    },
  },

  places: {
    _model: "Place",
    place_1: {
      name: "Healys Pass",
      description: "Long steep Hill",
      location: "Glengariff",
      category: "Cat 2",
      longitude: 4,
      latitude: 4,
      placeMarkid: "->placeMark.cork",
    },

    place_2: {
      name: "Patricks Hill",
      description: "steep Climb",
      location: "Cork City",
      category: "Cat 2",
      longitude: 7,
      latitude: 7,
      placeMarkid: "->placeMark.cork",
    },

    place_3: {
      name: "Nad",
      description: "Long climb",
      location: "Nad, Cork",
      category: "Cat 3",
      longitude: 8,
      latitude: 8,
      placeMarkid: "->placeMark.cork",
    },
  },
};
