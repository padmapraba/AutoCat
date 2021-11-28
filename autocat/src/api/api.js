const HOST = "http://localhost:8000";

export async function searchCars() {
  const url = `${HOST}/cars?`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getMakes() {
  const url = `${HOST}/makes`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}
