exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 001,
          avatar:
            "https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
          first_name: "test",
          last_name: "user",
          email: "seededAccount",
          password: "reallysomethingelse",
          login_attempts: 0,
          title: "",
          salary: "$0",
          profile: 0,
          role: 3893,
          department: 200,
          role_name: "Team Member",
          department_name: "Operations",
          pinpoint: 75,
          active: true,
        },
      ]);
    });
};
