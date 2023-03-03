const createAdventureSchema = {
  required: ["title", "description", "startDateTime", "endDateTime", "numInvitations", "location"],
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
    location: {
      type: "object",
      required: ["latitude", "longitude"],
      properties: {
        latitude: {
          type: "string",
        },
        longitude: {
          type: "string",
        },
      },
    },
  },
};

export { createAdventureSchema };
