<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDealRequest;
use App\Services\ZohoService;

class DealController extends Controller
{
  private $zohoService;

  public function __construct(ZohoService $zohoService)
  {
    $this->zohoService = $zohoService;
  }

  public function create(CreateDealRequest $request)
  {
    $validated = $request->validated();

    $response = $this->zohoService->post('/Deals', [
      'data' => [
        [
          'Deal_Name' => $validated['deal_name'],
          'Stage' => $validated['deal_stage'],
          'Account_Name' => ['id' => $validated['account_id']],
        ],
      ],
    ]);

    return $response->successful()
      ? reset($response->json()['data'])
      : response()->json(['error' => 'Failed to create deal'], 500);
  }
}
