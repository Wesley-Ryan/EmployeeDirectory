exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("roles").insert([
        { role_id: 1328, name: "Administrator" },
        { role_id: 2, colName: "Manager" },
        { role_id: 3, colName: "Team Member" },
      ]);
    });
};
