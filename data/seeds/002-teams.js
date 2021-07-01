exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("departments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("departments").insert([
        { department_id: 0400, name: "IT" },
        { department_id: 0300, name: "Sales" },
        { department_id: 0200, name: "Operations" },
        { department_id: 0100, name: "Engineering" },
      ]);
    });
};
