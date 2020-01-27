
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: "jarrod",
          password: "$2a$08$wLKmTQqDH2R7INnq5aDSpOc816L941paADwyObxfJ7QUz2NmT19p."
      },
      {
          id: 2,
          username: "kevin",
          password: "$2a$08$GY06c2ayjEvQEkpJ22351eq3jVWxM5XZUoeK7.7ikIlkP4qndiwUy"
      }
      ]);
    });
};
