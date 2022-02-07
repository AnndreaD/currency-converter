const baseUrl = "/b/561I";

export async function getExhangeRates(): Promise<any> {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (!response.ok) {
    throw response.status;
  }
  return response.json();
}
