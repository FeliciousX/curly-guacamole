export class User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  phone: string;
  cell: string;
  gender: string;
  email: string;
  location: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    },
    timezone: {
      offset: string;
      description: string;
    }
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  id: {
    name: string;
    value: string;
  };
  nat: string;
}
