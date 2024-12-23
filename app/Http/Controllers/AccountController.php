<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAccountRequest;
use App\Services\ZohoService;

class AccountController extends Controller
{
  private $zohoService;

  public function __construct(ZohoService $zohoService)
  {
    $this->zohoService = $zohoService;
  }

  public function index()
  {
    $response = $this->zohoService->get('post', '/Accounts/bulk');

    return $response->successful()
      ? response()->json($response->json())
      : response()->json(['error' => 'Failed to fetch accounts'], 500);
  }

  public function create(CreateAccountRequest $request)
  {
    $validated = $request->validated();

    $response = $this->zohoService->post('/Accounts', [
      'data' => [
        [
          'Account_Name' => $validated['account_name'],
          'Website' => $validated['account_website'],
          'Phone' => $validated['account_phone'],
        ],
      ],
    ]);

    return $response->successful()
      ? reset($response->json()['data'])
      : response()->json(['error' => 'Failed to create account'], 500);
  }
}
