const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnYW5lc2hzYWlhbGxhMzY5QGdtYWlsLmNvbSIsImV4cCI6MTc4MDY0MDkwMSwiaWF0IjoxNzgwNjQwMDAxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmQ4NTAyMjItYjI5MS00OGFkLTkxM2ItYzRmOWJkNDVmZjQ4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWxsYSB2ZW5rYXRhIG5hZ2EgZHVyZ2EgZ2FuZXNoIHNhaSIsInN1YiI6IjhhMTJhMWFlLTE0MDgtNGM1MC1hZTU3LWM3ODdmNDVlM2YxZSJ9LCJlbWFpbCI6ImdhbmVzaHNhaWFsbGEzNjlAZ21haWwuY29tIiwibmFtZSI6ImFsbGEgdmVua2F0YSBuYWdhIGR1cmdhIGdhbmVzaCBzYWkiLCJyb2xsTm8iOiIyM2JxMWE2MTAzIiwiYWNjZXNzQ29kZSI6IlFRZEVZeSIsImNsaWVudElEIjoiOGExMmExYWUtMTQwOC00YzUwLWFlNTctYzc4N2Y0NWUzZjFlIiwiY2xpZW50U2VjcmV0IjoiRlR5cWRDckNyUUROdXNzSiJ9.sRw4fwRM-xsFvtu1puMMNT_TR7WPn-kIfARX5z4e3Xc";

export const Log = async (stack, level, packageName, message) => {
  try {
    await fetch("/api/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};