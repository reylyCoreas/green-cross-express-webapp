export type Location = {
  id: string;
  name: string;
  status: "open" | "closed";
  addressLines: string[];
  phone: string;
  latitude: number;
  longitude: number;
};

// Example locations around Houston
export const locations: Location[] = [
  {
    id: "houston-main",
    name: "GreenCross Houston",
    status: "open",
    addressLines: ["9030 North Fwy", "Houston, TX 77037"],
    phone: "(713) 555-0100",
    latitude: 29.8896,
    longitude: -95.4118,
  },
  {
    id: "midtown",
    name: "GreenCross Midtown",
    status: "open",
    addressLines: ["1200 Main St", "Houston, TX 77002"],
    phone: "(713) 555-0123",
    latitude: 29.7569,
    longitude: -95.3623,
  },
  {
    id: "westheimer",
    name: "GreenCross Westheimer",
    status: "open",
    addressLines: ["6400 Westheimer Rd", "Houston, TX 77057"],
    phone: "(713) 555-0199",
    latitude: 29.7389,
    longitude: -95.4971,
  },
];
