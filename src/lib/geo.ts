import type { Location } from "./locations";

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

export function distanceInKm(a: Location, b: { latitude: number; longitude: number }) {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

export function findNearestLocation(
  locations: Location[],
  point: { latitude: number; longitude: number }
): Location | null {
  if (!locations.length) return null;
  let nearest = locations[0];
  let minDistance = distanceInKm(nearest, point);

  for (let i = 1; i < locations.length; i++) {
    const d = distanceInKm(locations[i], point);
    if (d < minDistance) {
      minDistance = d;
      nearest = locations[i];
    }
  }

  return nearest;
}
