const baseUrl = "https://jsonkeeper.com/b/561I";

export async function getExhangeRates(): Promise<unknown> {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw response.status;
  }
  return response;
}
