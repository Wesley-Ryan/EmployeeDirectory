exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("departments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("departments").insert([
        { department_id: 400, name: "IT" },
        { department_id: 300, name: "Sales" },
        { department_id: 200, name: "Operations" },
        { department_id: 100, name: "Engineering" },
      ]);
    });
};
