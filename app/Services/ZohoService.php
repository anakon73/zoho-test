<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ZohoService
{
  private $accessToken;

  public function __construct()
  {
    $this->accessToken = $this->getAccessToken();
  }

  private function getAccessToken(): string
  {
    $accessToken = Cache::get('zoho_access_token');

    if (!$accessToken) {
      $accessToken = $this->refreshAccessToken();
    }

    return $accessToken;
  }

  private function refreshAccessToken(): string
  {
    $refreshToken = env('ZOHO_REFRESH_TOKEN');
    $clientId = env('ZOHO_CLIENT_ID');
    $clientSecret = env('ZOHO_CLIENT_SECRET');
    $redirectUri = env('ZOHO_REDIRECT_URI');

    $response = Http::asForm()->post('https://accounts.zoho.eu/oauth/v2/token', [
      'refresh_token' => $refreshToken,
      'client_id' => $clientId,
      'client_secret' => $clientSecret,
      'redirect_uri' => $redirectUri,
      'grant_type' => 'refresh_token',
    ]);

    if ($response->successful()) {
      $newToken = $response->json()['access_token'];

      Cache::put('zoho_access_token', $newToken, now()->addHour());
      Log::info('Zoho access token refreshed successfully.');

      return $newToken;
    }

    Log::error('Failed to refresh Zoho access token', ['response' => $response->body()]);
    throw new \Exception('Failed to refresh access token');
  }

  public function get(string $method, string $endpoint)
  {
    $response = Http::withToken($this->accessToken)->$method(env('ZOHO_API_URL') . $endpoint);

    if ($response->status() === 401) {
      $this->accessToken = $this->refreshAccessToken();
      $response = Http::withToken($this->accessToken)->get(env('ZOHO_API_URL') . $endpoint);
    }

    return $response;
  }

  public function post(string $endpoint, array $data)
  {
    $response = Http::withToken($this->accessToken)->post(env('ZOHO_API_URL') . $endpoint, $data);

    if ($response->status() === 401) {
      $this->accessToken = $this->refreshAccessToken();
      $response = Http::withToken($this->accessToken)->post(env('ZOHO_API_URL') . $endpoint, $data);
    }

    return $response;
  }
}
