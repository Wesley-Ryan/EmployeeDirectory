exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("roles").insert([
        { role_id: 1328, name: "Administrator" },
        { role_id: 2399, name: "Manager" },
        { role_id: 3893, name: "Team Member" },
      ]);
    });
};
