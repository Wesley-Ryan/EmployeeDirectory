exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 001,
          first_name: "test",
          last_name: "user",
          email: "fakeaccount",
          password: "reallysomethingelse",
          title: "Fake worker",
          salary: "$0",
          role: 3893,
          department: 0200,
          pinpoint: 0,
        },
      ]);
    });
};
