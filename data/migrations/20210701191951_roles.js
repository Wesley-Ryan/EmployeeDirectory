exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("name", 255).notNullable().unique();
    })
    .createTable("departments", (department) => {
      department.increments("department_id");
      department.string("name").notNullable();
    })
    .createTable("users", (users) => {
      users.increments("id");
      users.string("first_name", 255).notNullable();
      users.string("last_name", 255).notNullable();
      users.string("email", 255).notNullable().unique();
      users.string("password", 255).notNullable();
      users.integer("login_attempts");

      users.string("title", 255);
      users.string("salary");
      users
        .integer("role")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      users
        .integer("department")
        .unsigned()
        .notNullable()
        .references("department_id")
        .inTable("departments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      users.string("pinpoint");
      users.boolean("active").notNullable().defaultTo(1);
    })
    .createTable("sessions", (session) => {
      session.string("id").notNullable();
      session
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      session.boolean("valid").notNullable().defaultTo(0);
      session.string("user_agent").notNullable();
      session.string("ip").notNullable();
      session.date("created_at").notNullable();
      session.integer("expires").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("sessions")
    .dropTableIfExists("users")
    .dropTableIfExists("roles")
    .dropTableIfExists("departments");
};
