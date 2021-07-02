function buildUser(user, type, hashedPassword) {
  console.log("BUILD USER", user);
  switch (type) {
    case "Administrator": {
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashedPassword,
        title: user.title,
        salary: user.salary,
        role: 1328,
        department: user.department,
        pinpoint: user.pinpoint,
      };
    }
    case "Manager": {
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashedPassword,
        title: user.title,
        salary: user.salary,
        role: 2399,
        department: user.department,
        pinpoint: user.pinpoint,
      };
    }

    default: {
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashedPassword,
        title: user.title,
        salary: user.salary,
        role: 3893,
        department: user.department,
        pinpoint: user.pinpoint,
      };
    }
  }
}

module.exports = buildUser;
