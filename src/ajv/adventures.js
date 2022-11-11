const createAdventureSchema = {
  required: ["username", "password"],
  additionalProperties: false,
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    startDateTime: {
      type: "string",
      format: "date-time",
    },
    endDateTime: {
      type: "string",
      format: "date-time",
    },
    numInvitations: {
      type: "integer",
      minimum: 1,
    },
  },
};

export { createAdventureSchema };
