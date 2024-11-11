export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}/`;
  } else {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  }
};
