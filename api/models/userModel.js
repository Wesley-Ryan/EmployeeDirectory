const db = require("../../data/db-config");

module.exports = {
  async getAllUsers() {
    const all = await db("users");
    return all.map((each) => ({ ...each, password: "" }));
  },
  async getAllUsersGeneralInfo() {
    const allUsers = await db("users");
    return allUsers.map((employee) => {
      const employeeGeneralInfo = {
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        title: employee.title,
        department: employee.department,
        department_name: employee.department_name,
      };
      return employeeGeneralInfo;
    });
  },
  async getAllUsersByDepartmentGeneralInfo(department) {
    const allDepartment = await db("users").where("department", department);
    return allDepartment.map((employee) => {
      const employeeGeneralInfo = {
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        title: employee.title,
        department: employee.department,
        department_name: employee.department_name,
      };
      return employeeGeneralInfo;
    });
  },
  async getAllUsersByDepartment(department) {
    const all = await db("users").where("department", department);
    return all.map((each) => ({ ...each, password: "" }));
  },
  findUserByEmail(email) {
    return db("users").where("email", email);
  },

  findUserByID(id) {
    return db("users").where("id", id);
  },
  findUserSavior(berry) {
    return db("users").where("pinpoint", berry);
  },

  async createUser(user) {
    try {
      await db("users").insert(user);
      return "User Created";
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async updateUser(id, changes) {
    try {
      await db("users").where("id", id).update(changes);
      return db("users").where("id", id);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  findRole(role) {
    return db("roles").where("role_id", role);
  },
};
