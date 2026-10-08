// API reference content for /docs. SERVER ONLY: import this file from server components only,
// so request and response details are never shipped to visitors who are not logged in.
// Generated from the SabbPe Postman collections, the Pay By Link samples and the KYC + CAMS guide. Test credentials and
// real account details have been replaced with placeholders.
if (typeof window !== 'undefined') { throw new Error('apiData must not be imported in client components'); }

export type ApiField = { name: string; type: string; example: string; desc: string };
export type ApiEndpoint = { id: string; title: string; method: string; path: string; summary: string; headers: { name: string; value: string }[]; examples: { label: string; body: string }[]; fields: ApiField[]; response: string | null; failure: string | null; errors: { message: string; cause: string }[]; notes: string[] };
export type ApiProduct = { intro: string; endpoints: ApiEndpoint[] };

export const TEST_BASE_URL = 'https://ecosystemuat.sabbpe.com';

export const API_DATA: Record<string, ApiProduct> = {
  "checkout-page": {
    "intro": "Four calls take a customer from your site to a confirmed payment: get a token, start the payment, then check or read the result.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/sabbpe/v1/token",
        "summary": "Get a token before starting a payment.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_userid\": \"YOUR_USER_ID\",\n  \"sabbpe_merchantid\": \"YOUR_MERCHANT_ID\",\n  \"sabbpe_password\": \"YOUR_PASSWORD\",\n  \"timestamp\": \"2026-10-08 10:00:00\",\n  \"merchant_order_ref\": \"ORD-1001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_userid",
            "type": "string",
            "example": "YOUR_USER_ID",
            "desc": "Your SabbPe user ID."
          },
          {
            "name": "sabbpe_merchantid",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "sabbpe_password",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 10:00:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          },
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"transaction_id\": \"<txn-id>\",\n  \"sabbpe_token\": \"<token>\",\n  \"token_expiry_minutes\": 15,\n  \"message\": \"Token generated successfully\",\n  \"merchant_order_ref\": \"ORD-1001\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "The token is valid for 15 minutes.",
          "timestamp uses the format yyyy-MM-dd HH:mm:ss.",
          "merchant_order_ref must be unique. You use it later to check the status."
        ]
      },
      {
        "id": "initiate",
        "title": "Initiate Payment",
        "method": "POST",
        "path": "/sabbpe/v1/initiate",
        "summary": "Start a payment. Send the customer to the payment_url in the response.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"amount\": 100,\n  \"productinfo\": \"Order 1001\",\n  \"frontend_url\": \"https://yourstore.in/payment-result\",\n  \"customer\": {\n    \"firstname\": \"Customer Name\",\n    \"email\": \"name@example.com\",\n    \"phone\": \"9000000000\"\n  }\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "amount",
            "type": "number",
            "example": "100.0",
            "desc": "Amount in rupees."
          },
          {
            "name": "productinfo",
            "type": "string",
            "example": "Order 1001",
            "desc": "Short description of what is being paid for."
          },
          {
            "name": "frontend_url",
            "type": "string",
            "example": "https://yourstore.in/payment-result",
            "desc": "Page the customer returns to after paying."
          },
          {
            "name": "customer.firstname",
            "type": "string",
            "example": "Customer Name",
            "desc": "Customer name."
          },
          {
            "name": "customer.email",
            "type": "string",
            "example": "name@example.com",
            "desc": "Customer email."
          },
          {
            "name": "customer.phone",
            "type": "string",
            "example": "9000000000",
            "desc": "Customer mobile number."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"transaction_id\": \"<transaction_id>\",\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"payment_url\": \"<payment_url>\",\n  \"gateway\": \"<gateway>\",\n  \"txnid\": \"<txnid>\",\n  \"initiation_status\": \"<initiation_status>\",\n  \"message\": \"<message>\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "amount is a number, not a string.",
          "Keep the txnid from the response. You need it for Decrypt Token.",
          "The customer is returned to your frontend_url when the payment finishes."
        ]
      },
      {
        "id": "status",
        "title": "Check Status",
        "method": "POST",
        "path": "/sabbpe/v1/status",
        "summary": "Check the result of a payment using your own order reference.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"merchant_id\": \"YOUR_MERCHANT_ID\"\n}"
          }
        ],
        "fields": [
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          },
          {
            "name": "merchant_id",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID. Use the merchant ID, not the user ID."
          }
        ],
        "response": "{\n  \"gateway\": \"<gateway>\",\n  \"master_transaction_id\": \"<master_transaction_id>\",\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"status\": \"<status>\",\n  \"amount\": \"<amount>\",\n  \"currency\": \"<currency>\",\n  \"payment_completed_at\": \"<payment_completed_at>\",\n  \"payment_method\": \"<payment_method>\",\n  \"callback_forwarded\": \"<true or false>\",\n  \"callback_response\": \"<callback_response>\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "merchant_id must be the merchant ID you used to generate the token, not the user ID. Otherwise the call returns 400 \"Transaction not found\".",
          "Works for unpaid and pending payments too.",
          "If a callback was sent to your callback URL, this returns that same payload.",
          "Errors return { \"status\": false, \"message\": \"...\" } with HTTP 400, for missing fields or an unknown transaction."
        ]
      },
      {
        "id": "decrypt",
        "title": "Decrypt Token",
        "method": "POST",
        "path": "/api/v1/decrypt-token",
        "summary": "Read back the payment result for a txnid.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"txnid\": \"<txnid>\"\n}"
          }
        ],
        "fields": [
          {
            "name": "txnid",
            "type": "string",
            "example": "<txnid>",
            "desc": "The txnid returned by Initiate Payment."
          }
        ],
        "response": "{\n  \"gateway\": \"<gateway>\",\n  \"master_transaction_id\": \"<master_transaction_id>\",\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"status\": \"<status>\",\n  \"amount\": \"<amount>\",\n  \"currency\": \"<currency>\",\n  \"payment_completed_at\": \"<payment_completed_at>\",\n  \"payment_method\": \"<payment_method>\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "payment_method may be absent.",
          "Errors return { \"error\", \"stage\", \"message\" } with HTTP 400, 403 or 500."
        ]
      }
    ]
  },
  "upi-deeplink": {
    "intro": "Create a UPI payment request and get back a upi:// link that opens the customer's UPI app.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/sabbpe/payin/token",
        "summary": "Get a token before creating a payment request.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_merchantid\": \"YOUR_MERCHANT_ID\",\n  \"sabbpe_password\": \"YOUR_PASSWORD\",\n  \"timestamp\": \"2026-10-08 10:00:00\",\n  \"merchant_order_ref\": \"ORD-1001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_merchantid",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "sabbpe_password",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 10:00:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          },
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": [
          "The token is valid for 15 minutes.",
          "timestamp must be within 5 minutes of server time.",
          "merchant_order_ref must be unique for every call."
        ]
      },
      {
        "id": "register",
        "title": "Register Intent",
        "method": "POST",
        "path": "/api/v1/sabbpe/intent/register",
        "summary": "Create the payment request. The response carries the orderId, the gatewayTransactionId and the upi:// deeplink.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "X-Sabbpe-Token",
            "value": "<sabbpe_token>"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"amount\": \"1.00\",\n  \"merchantRequestId\": \"ORDER-20261008-0001\",\n  \"flow\": \"TRANSACTION\",\n  \"intentRequestExpiryMinutes\": \"30\",\n  \"remarks\": \"Payment for order\"\n}"
          }
        ],
        "fields": [
          {
            "name": "amount",
            "type": "string",
            "example": "1.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "merchantRequestId",
            "type": "string",
            "example": "ORDER-20261008-0001",
            "desc": "Your unique ID for this payment."
          },
          {
            "name": "flow",
            "type": "string",
            "example": "TRANSACTION",
            "desc": ""
          },
          {
            "name": "intentRequestExpiryMinutes",
            "type": "string",
            "example": "30",
            "desc": "Minutes before the payment request expires."
          },
          {
            "name": "remarks",
            "type": "string",
            "example": "Payment for order",
            "desc": "Your note for this payment."
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": [
          "merchantRequestId must be unique for every payment.",
          "If your account has a sub-merchant configured, it is applied automatically."
        ]
      },
      {
        "id": "status",
        "title": "Transaction Status",
        "method": "POST",
        "path": "/api/v1/sabbpe/transaction/status",
        "summary": "Check the result of a payment created with Register Intent.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "X-Sabbpe-Token",
            "value": "<sabbpe_token>"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"merchantRequestId\": \"ORDER-20261008-0001\",\n  \"transactionType\": \"MERCHANT_CREDITED_VIA_PAY\"\n}"
          }
        ],
        "fields": [
          {
            "name": "merchantRequestId",
            "type": "string",
            "example": "ORDER-20261008-0001",
            "desc": "Your unique ID for this payment."
          },
          {
            "name": "transactionType",
            "type": "string",
            "example": "MERCHANT_CREDITED_VIA_PAY",
            "desc": ""
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": [
          "Pass the same merchantRequestId you used in Register Intent."
        ]
      }
    ]
  },
  "payouts": {
    "intro": "Generate a token, send the transfer, then confirm the result by callback or status enquiry.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/api/v1/sabbpe/payout/token/",
        "summary": "Get a token before sending any payout.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"merchantId\": \"YOUR_MERCHANT_ID\",\n  \"merchantPassword\": \"YOUR_PASSWORD\",\n  \"merchantOrderReference\": \"ORD-1001\",\n  \"timestamp\": \"2026-10-08 10:00:00\"\n}"
          }
        ],
        "fields": [
          {
            "name": "merchantId",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "merchantPassword",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "merchantOrderReference",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 10:00:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": [
          "The token is valid for 15 minutes."
        ]
      },
      {
        "id": "fund-transfer",
        "title": "Fund Transfer",
        "method": "POST",
        "path": "/api/v1/sabbpe/payout/transaction",
        "summary": "Send money to a bank account. Set action to the transfer mode you want.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "Authorization",
            "value": "Bearer <sabbpe_token>"
          }
        ],
        "examples": [
          {
            "label": "Intrabank",
            "body": "{\n  \"action\": \"INTRABANK\",\n  \"payload\": {\n    \"BeneficiaryDetails\": {\n      \"Name\": \"Beneficiary Name\",\n      \"AccNumber\": \"000111222333\",\n      \"IFSC\": \"ABCD0001234\",\n      \"Notification_Flag\": \"NONE\",\n      \"Mobile\": \"9000000000\",\n      \"Email\": \"name@example.com\"\n    },\n    \"Amount\": \"200.00\",\n    \"Remarks\": \"test Intrabank\"\n  }\n}"
          },
          {
            "label": "IMPS",
            "body": "{\n  \"action\": \"IMPS\",\n  \"payload\": {\n    \"BeneficiaryDetails\": {\n      \"Name\": \"Beneficiary Name\",\n      \"AccNumber\": \"000111222333\",\n      \"IFSC\": \"ABCD0001234\",\n      \"Notification_Flag\": \"NONE\",\n      \"Mobile\": \"9000000000\",\n      \"Email\": \"name@example.com\"\n    },\n    \"Amount\": \"200.00\",\n    \"Remarks\": \"test IMPS\"\n  }\n}"
          },
          {
            "label": "NEFT",
            "body": "{\n  \"action\": \"NEFT\",\n  \"payload\": {\n    \"BeneficiaryDetails\": {\n      \"Name\": \"Beneficiary Name\",\n      \"AccNumber\": \"000111222333\",\n      \"Acctype\": \"10\",\n      \"IFSC\": \"ABCD0001234\",\n      \"address\": \"Hyderabad\",\n      \"Notification_Flag\": \"NONE\"\n    },\n    \"Amount\": \"200.00\",\n    \"Remarks\": \"test NEFT\"\n  }\n}"
          },
          {
            "label": "RTGS",
            "body": "{\n  \"action\": \"RTGS\",\n  \"payload\": {\n    \"BeneficiaryDetails\": {\n      \"Name\": \"Beneficiary Name\",\n      \"AccNumber\": \"000111222333\",\n      \"Acctype\": \"10\",\n      \"IFSC\": \"ABCD0001234\",\n      \"address\": \"Hyderabad\",\n      \"Notification_Flag\": \"NONE\",\n      \"Mobile\": \"9000000000\",\n      \"Email\": \"name@example.com\"\n    },\n    \"Amount\": \"200000.00\",\n    \"Remarks\": \"test RTGS\",\n    \"Alternative_Payments\": \"N\",\n    \"Postpone\": \"Y\"\n  }\n}"
          }
        ],
        "fields": [
          {
            "name": "action",
            "type": "string",
            "example": "INTRABANK",
            "desc": "Transfer mode: INTRABANK, IMPS, NEFT or RTGS."
          },
          {
            "name": "payload.BeneficiaryDetails.Name",
            "type": "string",
            "example": "Beneficiary Name",
            "desc": ""
          },
          {
            "name": "payload.BeneficiaryDetails.AccNumber",
            "type": "string",
            "example": "000111222333",
            "desc": "Beneficiary bank account number."
          },
          {
            "name": "payload.BeneficiaryDetails.IFSC",
            "type": "string",
            "example": "ABCD0001234",
            "desc": "Beneficiary bank IFSC."
          },
          {
            "name": "payload.BeneficiaryDetails.Notification_Flag",
            "type": "string",
            "example": "NONE",
            "desc": ""
          },
          {
            "name": "payload.BeneficiaryDetails.Mobile",
            "type": "string",
            "example": "9000000000",
            "desc": ""
          },
          {
            "name": "payload.BeneficiaryDetails.Email",
            "type": "string",
            "example": "name@example.com",
            "desc": ""
          },
          {
            "name": "payload.Amount",
            "type": "string",
            "example": "200.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "payload.Remarks",
            "type": "string",
            "example": "test Intrabank",
            "desc": "Your note for this transfer."
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": [
          "The immediate response is the bank acknowledgment only. The final result arrives by callback, or use Transaction Status."
        ]
      },
      {
        "id": "upi-pay",
        "title": "UPI Pay",
        "method": "POST",
        "path": "/api/v1/sabbpe/upi/transaction",
        "summary": "Send money to a UPI ID.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "Authorization",
            "value": "Bearer <sabbpe_token>"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"TransactionType\": \"PAY\",\n  \"Amount\": \"100.00\",\n  \"PayeeAddress\": \"payee@bank\",\n  \"PayeeName\": \"Payee Name\",\n  \"InitiationMode\": \"00\",\n  \"PurposeCode\": \"00\"\n}"
          }
        ],
        "fields": [
          {
            "name": "TransactionType",
            "type": "string",
            "example": "PAY",
            "desc": ""
          },
          {
            "name": "Amount",
            "type": "string",
            "example": "100.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "PayeeAddress",
            "type": "string",
            "example": "payee@bank",
            "desc": "UPI ID of the person being paid."
          },
          {
            "name": "PayeeName",
            "type": "string",
            "example": "Payee Name",
            "desc": ""
          },
          {
            "name": "InitiationMode",
            "type": "string",
            "example": "00",
            "desc": ""
          },
          {
            "name": "PurposeCode",
            "type": "string",
            "example": "00",
            "desc": ""
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "status",
        "title": "Transaction Status",
        "method": "POST",
        "path": "/api/v1/sabbpe/status/transaction",
        "summary": "Check the result of a fund transfer.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "Authorization",
            "value": "Bearer <sabbpe_token>"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"referenceId\": \"<referenceId from Fund Transfer>\"\n}"
          }
        ],
        "fields": [
          {
            "name": "referenceId",
            "type": "string",
            "example": "<referenceId from Fund Transfer>",
            "desc": "Reference returned by the Fund Transfer call."
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "upi-status",
        "title": "UPI Status",
        "method": "POST",
        "path": "/api/v1/sabbpe/upi/status",
        "summary": "Check the result of a UPI Pay transfer.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "Authorization",
            "value": "Bearer <sabbpe_token>"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"TransactionId\": \"<TransactionId from UPI Pay>\"\n}"
          }
        ],
        "fields": [
          {
            "name": "TransactionId",
            "type": "string",
            "example": "<TransactionId from UPI Pay>",
            "desc": "Transaction ID returned by the UPI Pay call."
          }
        ],
        "response": null,
        "failure": null,
        "errors": [],
        "notes": []
      }
    ]
  },
  "kyc-apis": {
    "intro": "Every check takes one request and returns the same response envelope.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/sabbpe/v1/token",
        "summary": "Get a token before calling any other API in this product. Send it as sabbpe_token in each request body.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_userid\": \"YOUR_USER_ID\",\n  \"sabbpe_merchantid\": \"YOUR_MERCHANT_ID\",\n  \"sabbpe_password\": \"YOUR_PASSWORD\",\n  \"timestamp\": \"2026-10-08 10:00:00\",\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"service_code\": \"KYC\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_userid",
            "type": "string",
            "example": "YOUR_USER_ID",
            "desc": "Your SabbPe user ID."
          },
          {
            "name": "sabbpe_merchantid",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "sabbpe_password",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 10:00:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          },
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          },
          {
            "name": "service_code",
            "type": "string",
            "example": "KYC",
            "desc": "The service this token is for."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"transaction_id\": \"<txn-id>\",\n  \"sabbpe_token\": \"<token>\",\n  \"token_expiry_minutes\": 15,\n  \"message\": \"Token generated successfully\",\n  \"merchant_order_ref\": \"ORD-1001\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "The token is valid for 15 minutes."
        ]
      },
      {
        "id": "aadhaar-otp",
        "title": "Aadhaar: Generate OTP",
        "method": "POST",
        "path": "/api/v1/aadhaar-okyc-generate-otp",
        "summary": "Send an OTP to the mobile number linked to an Aadhaar number.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"input\": {\n    \"aadhaarNumber\": \"999988887777\"\n  }\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "input.aadhaarNumber",
            "type": "string",
            "example": "999988887777",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"code\": 200,\n    \"success\": true,\n    \"referenceId\": \"OKYC-7f3a9c\",\n    \"data\": {\n      \"referenceId\": \"OKYC-7f3a9c\"\n    }\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: The customer's 12-digit Aadhaar number (and optional mobile).",
          "Keep the referenceId from the response for the Submit OTP call.",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "aadhaar-submit",
        "title": "Aadhaar: Submit OTP",
        "method": "POST",
        "path": "/api/v1/aadhaar-okyc-submit-otp",
        "summary": "Verify the OTP and receive the Aadhaar details.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"input\": {\n    \"referenceId\": \"<from 4.1>\",\n    \"otp\": \"123456\"\n  }\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "input.referenceId",
            "type": "string",
            "example": "<from 4.1>",
            "desc": "Reference returned by the Fund Transfer call."
          },
          {
            "name": "input.otp",
            "type": "string",
            "example": "123456",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"code\": 200,\n    \"success\": true,\n    \"referenceId\": \"OKYC-7f3a9c\",\n    \"data\": {\n      \"aadhaarNumber\": \"XXXXXXXX7777\",\n      \"name\": \"SHYAM KUMAR\",\n      \"dob\": \"1995-01-01\",\n      \"gender\": \"M\",\n      \"message\": \"OKYC downloaded\"\n    }\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: The OTP the customer received, plus the referenceId returned by 4.1 (also stored in master_transactions.reference_id).",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "bank-validation",
        "title": "Bank Account Validation",
        "method": "POST",
        "path": "/api/v1/bank-account-validation",
        "summary": "Confirm a bank account and its holder name with a penny drop.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"requestId\": \"REQ-1001\",\n  \"custName\": \"SHYAM KUMAR\",\n  \"custIfsc\": \"HDFC0001234\",\n  \"custAcctNo\": \"50100123456789\",\n  \"trackingRefNo\": \"TRK-1\",\n  \"txnType\": \"A\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "requestId",
            "type": "string",
            "example": "REQ-1001",
            "desc": ""
          },
          {
            "name": "custName",
            "type": "string",
            "example": "SHYAM KUMAR",
            "desc": ""
          },
          {
            "name": "custIfsc",
            "type": "string",
            "example": "HDFC0001234",
            "desc": ""
          },
          {
            "name": "custAcctNo",
            "type": "string",
            "example": "50100123456789",
            "desc": ""
          },
          {
            "name": "trackingRefNo",
            "type": "string",
            "example": "TRK-1",
            "desc": ""
          },
          {
            "name": "txnType",
            "type": "string",
            "example": "A",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"statusCode\": 1,\n    \"status\": \"SUCCESS\",\n    \"message\": \"Penny drop verified\",\n    \"utr\": \"HDFC2026092901\",\n    \"beneficiaryName\": \"SHYAM KUMAR\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: Customer name, IFSC, account number, plus your own requestId/trackingRefNo for reconciliation.",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "vpa-validation",
        "title": "UPI ID Validation",
        "method": "POST",
        "path": "/api/v1/vpa-validation",
        "summary": "Confirm that a UPI ID exists.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"vpa\": \"user@okhdfc\",\n  \"client_ref_num\": \"REF-9001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "vpa",
            "type": "string",
            "example": "user@okhdfc",
            "desc": ""
          },
          {
            "name": "client_ref_num",
            "type": "string",
            "example": "REF-9001",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"vpa\": \"user@okhdfc\",\n    \"name\": \"SHYAM KUMAR\",\n    \"status\": \"ACTIVE\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: A UPI VPA plus your own client_ref_num (stored as request_id).",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "credit-report",
        "title": "Credit Report",
        "method": "POST",
        "path": "/api/v1/experian-report",
        "summary": "Pull a credit bureau report for a customer.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"name\": \"SHYAM KUMAR\",\n  \"mobile\": \"9880012345\",\n  \"pan\": \"ABCDE1234F\",\n  \"consent\": true,\n  \"consent_text\": \"I agree\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "name",
            "type": "string",
            "example": "SHYAM KUMAR",
            "desc": ""
          },
          {
            "name": "mobile",
            "type": "string",
            "example": "9880012345",
            "desc": ""
          },
          {
            "name": "pan",
            "type": "string",
            "example": "ABCDE1234F",
            "desc": ""
          },
          {
            "name": "consent",
            "type": "boolean",
            "example": "true",
            "desc": ""
          },
          {
            "name": "consent_text",
            "type": "string",
            "example": "I agree",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"code\": 1,\n    \"message\": \"Report generated\",\n    \"reportId\": \"EXP-2026-0929-01\",\n    \"report\": \"<report payload>\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: Name, mobile and PAN plus consent text. We normalise the mobile (strips +91 / 0 / non-digits) before forwarding.",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "ocr",
        "title": "Document OCR",
        "method": "POST",
        "path": "/api/v1/ocr",
        "summary": "Read the details from an identity document image.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"doc_front_image\": \"<base64>\",\n  \"doc_type\": \"PAN\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "doc_front_image",
            "type": "string",
            "example": "<base64>",
            "desc": ""
          },
          {
            "name": "doc_type",
            "type": "string",
            "example": "PAN",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"code\": 1,\n    \"message\": \"Document processed\",\n    \"data\": {\n      \"doc_type\": \"PAN\",\n      \"name_on_card\": \"SHYAM KUMAR\",\n      \"id_number\": \"ABCDE1234F\"\n    }\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: A document image (base64) and a doc_type such as PAN or AADHAAR.",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "esign-create",
        "title": "e-Sign: Create Agreement",
        "method": "POST",
        "path": "/api/v1/docuflow-create",
        "summary": "Send an agreement to a customer for electronic signature.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"email\": \"ops@sabbpe.com\",\n  \"generateAgreement\": \"Y\",\n  \"initiateEsign\": \"Y\",\n  \"dealName\": \"KYC-2026-001\",\n  \"dealReferenceId\": \"DF-2026-0001\",\n  \"expiryDate\": \"2026-12-31\",\n  \"entityId\": \"<UUID>\",\n  \"programId\": \"524\",\n  \"documentTypeId\": \"1\",\n  \"callbackURL\": \"https://ecosystemuat.sabbpe.com/api/v1/\\u2026\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "email",
            "type": "string",
            "example": "ops@sabbpe.com",
            "desc": ""
          },
          {
            "name": "generateAgreement",
            "type": "string",
            "example": "Y",
            "desc": ""
          },
          {
            "name": "initiateEsign",
            "type": "string",
            "example": "Y",
            "desc": ""
          },
          {
            "name": "dealName",
            "type": "string",
            "example": "KYC-2026-001",
            "desc": ""
          },
          {
            "name": "dealReferenceId",
            "type": "string",
            "example": "DF-2026-0001",
            "desc": ""
          },
          {
            "name": "expiryDate",
            "type": "string",
            "example": "2026-12-31",
            "desc": ""
          },
          {
            "name": "entityId",
            "type": "string",
            "example": "<UUID>",
            "desc": ""
          },
          {
            "name": "programId",
            "type": "string",
            "example": "524",
            "desc": ""
          },
          {
            "name": "documentTypeId",
            "type": "string",
            "example": "1",
            "desc": ""
          },
          {
            "name": "callbackURL",
            "type": "string",
            "example": "https://ecosystemuat.sabbpe.com/api/v1/…",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"dealReferenceId\": \"DF-2026-0001\",\n    \"status\": \"CREATED\",\n    \"signUrl\": \"https://<host>/esign/DF-2026-0001\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: Deal details: email, dealName, dealReferenceId, expiryDate, documentTypeId and the callbackURL DocuFlow should post status to (must be a callback/auth-none path).",
          "Always read status and business_status in the response body. The HTTP code alone does not tell you whether the check succeeded."
        ]
      },
      {
        "id": "esign-status",
        "title": "e-Sign: Status",
        "method": "POST",
        "path": "/api/v1/docuflow-status",
        "summary": "Check whether an agreement has been signed.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"dealReferenceId\": \"DF-2026-0001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "dealReferenceId",
            "type": "string",
            "example": "DF-2026-0001",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"dealReferenceId\": \"DF-2026-0001\",\n    \"status\": \"COMPLETED\",\n    \"signedDocumentUrl\": \"https://<host>/DF-2026-0001.pdf\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: The dealReferenceId returned by 4.7."
        ]
      },
      {
        "id": "esign-resend",
        "title": "e-Sign: Resend",
        "method": "POST",
        "path": "/api/v1/docuflow-resend",
        "summary": "Send the signing request again.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"dealRefId\": \"DF-2026-0001\",\n  \"email\": \"ops@sabbpe.com\",\n  \"expiryDate\": \"2026-12-31\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "dealRefId",
            "type": "string",
            "example": "DF-2026-0001",
            "desc": ""
          },
          {
            "name": "email",
            "type": "string",
            "example": "ops@sabbpe.com",
            "desc": ""
          },
          {
            "name": "expiryDate",
            "type": "string",
            "example": "2026-12-31",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"dealRefId\": \"DF-2026-0001\",\n    \"status\": \"LINK_RESENT\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: The deal reference — note the field is dealRefId here (create/status use dealReferenceId) — plus email and expiry."
        ]
      },
      {
        "id": "esign-cancel",
        "title": "e-Sign: Cancel",
        "method": "POST",
        "path": "/api/v1/docuflow-cancel",
        "summary": "Cancel an agreement that has not been signed.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"dealRefId\": \"DF-2026-0001\",\n  \"email\": \"ops@sabbpe.com\",\n  \"reasonForCancellation\": \"Duplicate request\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "dealRefId",
            "type": "string",
            "example": "DF-2026-0001",
            "desc": ""
          },
          {
            "name": "email",
            "type": "string",
            "example": "ops@sabbpe.com",
            "desc": ""
          },
          {
            "name": "reasonForCancellation",
            "type": "string",
            "example": "Duplicate request",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"downstream_http_status\": 200,\n  \"business_status\": \"SUCCESS\",\n  \"response\": {\n    \"dealRefId\": \"DF-2026-0001\",\n    \"status\": \"CANCELLED\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "You collect: The dealRefId, email, and a reasonForCancellation."
        ]
      }
    ]
  },
  "upi-autopay": {
    "intro": "Create a mandate once, then debit it each cycle. Subscriptions run the cycle for you.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/sabbpe/v1/token",
        "summary": "Get a token before calling any other API in this product. Send it as sabbpe_token in each request body.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_userid\": \"YOUR_USER_ID\",\n  \"sabbpe_merchantid\": \"YOUR_MERCHANT_ID\",\n  \"sabbpe_password\": \"YOUR_PASSWORD\",\n  \"timestamp\": \"2026-10-08 10:00:00\",\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"service_code\": \"NACH_MANDATE\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_userid",
            "type": "string",
            "example": "YOUR_USER_ID",
            "desc": "Your SabbPe user ID."
          },
          {
            "name": "sabbpe_merchantid",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "sabbpe_password",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 10:00:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          },
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          },
          {
            "name": "service_code",
            "type": "string",
            "example": "NACH_MANDATE",
            "desc": "The service this token is for."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"transaction_id\": \"<txn-id>\",\n  \"sabbpe_token\": \"<token>\",\n  \"token_expiry_minutes\": 15,\n  \"message\": \"Token generated successfully\",\n  \"merchant_order_ref\": \"ORD-1001\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "The token is valid for 15 minutes."
        ]
      },
      {
        "id": "validate-vpa",
        "title": "Validate UPI ID",
        "method": "POST",
        "path": "/api/v1/validvpa",
        "summary": "Check the customer's UPI ID before creating a mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"vpa\": \"testuser@okaxis\",\n  \"merchantid\": \"885585\",\n  \"subbillerid\": \"662416\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "vpa",
            "type": "string",
            "example": "testuser@okaxis",
            "desc": ""
          },
          {
            "name": "merchantid",
            "type": "string",
            "example": "885585",
            "desc": ""
          },
          {
            "name": "subbillerid",
            "type": "string",
            "example": "662416",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"SUCCESS\",\n  \"statusDesc\": \"VPA is available for transaction\",\n  \"vpa\": \"testuser@okhdfc\",\n  \"payer_name\": \"TEST USER\",\n  \"ifsc\": \"HDFC00000XX\",\n  \"account_type\": \"Savings\",\n  \"is_vpa_valid\": \"Y\",\n  \"is_autopay_eligible\": \"Y\",\n  \"errCode\": \"1111\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "mandate-create",
        "title": "Create Mandate",
        "method": "POST",
        "path": "/api/v1/mandatecreate",
        "summary": "Ask the customer to approve a UPI AutoPay mandate in their UPI app.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"trxnno\": \"UPIAUTOPAY-20260929-001\",\n  \"amount\": \"2.00\",\n  \"pattern\": \"ASPRESENTED\",\n  \"mandatestartdate\": \"29092026\",\n  \"mandateenddate\": \"29092027\",\n  \"revokeable\": \"Y\",\n  \"payervpa\": \"testuser@okaxis\",\n  \"payername\": \"Test User\",\n  \"executabledays\": \"01\",\n  \"executablemonth\": \"10\",\n  \"authorize\": \"N\",\n  \"authorizerevoke\": \"Y\",\n  \"instaauth\": \"N\",\n  \"intent\": \"N\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "trxnno",
            "type": "string",
            "example": "UPIAUTOPAY-20260929-001",
            "desc": ""
          },
          {
            "name": "amount",
            "type": "string",
            "example": "2.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "pattern",
            "type": "string",
            "example": "ASPRESENTED",
            "desc": ""
          },
          {
            "name": "mandatestartdate",
            "type": "string",
            "example": "29092026",
            "desc": ""
          },
          {
            "name": "mandateenddate",
            "type": "string",
            "example": "29092027",
            "desc": ""
          },
          {
            "name": "revokeable",
            "type": "string",
            "example": "Y",
            "desc": ""
          },
          {
            "name": "payervpa",
            "type": "string",
            "example": "testuser@okaxis",
            "desc": ""
          },
          {
            "name": "payername",
            "type": "string",
            "example": "Test User",
            "desc": ""
          },
          {
            "name": "executabledays",
            "type": "string",
            "example": "01",
            "desc": ""
          },
          {
            "name": "executablemonth",
            "type": "string",
            "example": "10",
            "desc": ""
          },
          {
            "name": "authorize",
            "type": "string",
            "example": "N",
            "desc": ""
          },
          {
            "name": "authorizerevoke",
            "type": "string",
            "example": "Y",
            "desc": ""
          },
          {
            "name": "instaauth",
            "type": "string",
            "example": "N",
            "desc": ""
          },
          {
            "name": "intent",
            "type": "string",
            "example": "N",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"PENDING\",\n  \"msg\": \"Mandate Request Pending\",\n  \"errCode\": \"1111\",\n  \"errDesc\": \"Please authorise the mandate request using UPI APP now\",\n  \"cp_mdt_ref_no\": \"MANPRODACI2AP0000000000001000301459\",\n  \"res\": {\n    \"trxnno\": \"UPIAUTOPAY-20260929-001\",\n    \"amount\": \"2.00\",\n    \"pattern\": \"ASPRESENTED\"\n  }\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "Keep the mandate reference from the response. You need it to debit, check or revoke the mandate."
        ]
      },
      {
        "id": "mandate-status",
        "title": "Mandate Status",
        "method": "POST",
        "path": "/api/v1/mandatestatus",
        "summary": "Check whether the customer has approved the mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"refno\": \"MANPRODACI2AP0000000000001000301459\",\n  \"merchantid\": \"885585\",\n  \"subbillerid\": \"662416\",\n  \"actiontype\": \"MANDATE_STATUS\",\n  \"trxnno\": \"UPIAUTOPAY-20260929-001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "refno",
            "type": "string",
            "example": "MANPRODACI2AP0000000000001000301459",
            "desc": ""
          },
          {
            "name": "merchantid",
            "type": "string",
            "example": "885585",
            "desc": ""
          },
          {
            "name": "subbillerid",
            "type": "string",
            "example": "662416",
            "desc": ""
          },
          {
            "name": "actiontype",
            "type": "string",
            "example": "MANDATE_STATUS",
            "desc": ""
          },
          {
            "name": "trxnno",
            "type": "string",
            "example": "UPIAUTOPAY-20260929-001",
            "desc": ""
          }
        ],
        "response": "{\n  \"merchantid\": \"885585\",\n  \"subbillerid\": \"662416\",\n  \"cp_mdt_ref_no\": \"MANPRODACI2AP0000000000001000301459\",\n  \"umn\": \"testuser@okaxis\",\n  \"trxnno\": \"UPIAUTOPAY-20260929-001\",\n  \"amount\": \"2.00\",\n  \"status\": \"ACTIVE\",\n  \"statusdesc\": \"APPROVED OR COMPLETED SUCCESSFULLY\",\n  \"action\": \"APPROVED OR COMPLETED SUCCESSFULLY\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "pre-debit",
        "title": "Pre-debit Notification",
        "method": "POST",
        "path": "/api/v1/mandatePreDebit",
        "summary": "Tell the customer about an upcoming debit.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"refno\": \"MANPRODACI2AP0000000000001000301459\",\n  \"amount\": \"2.00\",\n  \"nextRecurDate\": \"29102026\",\n  \"seqNo\": \"1\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "refno",
            "type": "string",
            "example": "MANPRODACI2AP0000000000001000301459",
            "desc": ""
          },
          {
            "name": "amount",
            "type": "string",
            "example": "2.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "nextRecurDate",
            "type": "string",
            "example": "29102026",
            "desc": ""
          },
          {
            "name": "seqNo",
            "type": "string",
            "example": "1",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"PENDING\",\n  \"statusdesc\": \"Pre Debit Notification Sent\",\n  \"cp_mandate_ref_no\": \"MANPRODACI2AP0000000000001000301459\",\n  \"bank_error_code\": \"\",\n  \"bank_error_desc\": \"\",\n  \"bank_res_code\": \"\",\n  \"bank_res_desc\": \"\",\n  \"seqno\": \"1\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "mandate-execute",
        "title": "Execute Debit",
        "method": "POST",
        "path": "/api/v1/mandateExecute",
        "summary": "Collect a payment against an approved mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"refno\": \"MANPRODACI2AP0000000000001000301459\",\n  \"amount\": \"2.00\",\n  \"seqno\": \"1\",\n  \"trxnno\": \"EXE-20260929-001\",\n  \"siptrxnno\": \"SIP-20260929-001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "refno",
            "type": "string",
            "example": "MANPRODACI2AP0000000000001000301459",
            "desc": ""
          },
          {
            "name": "amount",
            "type": "string",
            "example": "2.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "seqno",
            "type": "string",
            "example": "1",
            "desc": ""
          },
          {
            "name": "trxnno",
            "type": "string",
            "example": "EXE-20260929-001",
            "desc": ""
          },
          {
            "name": "siptrxnno",
            "type": "string",
            "example": "SIP-20260929-001",
            "desc": ""
          }
        ],
        "response": "{\n  \"trxnno\": \"EXE-20260929-001\",\n  \"siptrxnno\": \"SIP-20260929-001\",\n  \"cp_mandate_ref_no\": \"MANPRODACI2AP0000000000001000301459\",\n  \"executionrefno\": \"N0000210088\",\n  \"status\": \"INITIATED\",\n  \"statusdesc\": \"Transaction initiated\",\n  \"bankrrn\": \"108632416870\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "mandate-revoke",
        "title": "Revoke Mandate",
        "method": "POST",
        "path": "/api/v1/mandaterevoke",
        "summary": "Cancel a mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"refno\": \"MANPRODACI2AP0000000000001000301459\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "refno",
            "type": "string",
            "example": "MANPRODACI2AP0000000000001000301459",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"REVOKED\",\n  \"statusdesc\": \"Transaction Successful\",\n  \"cp_mandate_ref_no\": \"MANPRODACI2AP0000000000001000301459\",\n  \"bank_error_code\": \"00\",\n  \"bank_error_desc\": \"APPROVED OR COMPLETED SUCCESSFULLY\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "refund",
        "title": "Refund",
        "method": "POST",
        "path": "/api/v1/trxnrefund",
        "summary": "Refund a payment collected against a mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"refno\": \"MANPRODACI2AP0000000000001000301459\",\n  \"merchantid\": \"885585\",\n  \"subbillerid\": \"662416\",\n  \"bankrrn\": \"108632416870\",\n  \"amount\": \"2.00\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "refno",
            "type": "string",
            "example": "MANPRODACI2AP0000000000001000301459",
            "desc": ""
          },
          {
            "name": "merchantid",
            "type": "string",
            "example": "885585",
            "desc": ""
          },
          {
            "name": "subbillerid",
            "type": "string",
            "example": "662416",
            "desc": ""
          },
          {
            "name": "bankrrn",
            "type": "string",
            "example": "108632416870",
            "desc": ""
          },
          {
            "name": "amount",
            "type": "string",
            "example": "2.00",
            "desc": "Amount in rupees."
          }
        ],
        "response": "{\n  \"statusDesc\": \"No Transaction available to refund.\",\n  \"status\": \"FAILED\",\n  \"errCode\": \"0000\",\n  \"refundrefno\": \"\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "sub-create",
        "title": "Subscriptions: Create",
        "method": "POST",
        "path": "/api/v1/subscriptions",
        "summary": "Set up a plan that debits the mandate on a fixed day each month.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"merchant_organization_id\": \"<org-uuid>\",\n  \"product_code\": \"GOLD_MONTHLY\",\n  \"product_name\": \"Gold monthly plan\",\n  \"amount\": \"999.00\",\n  \"anchor_day\": 5,\n  \"mandate_type\": \"UPI\"\n}"
          }
        ],
        "fields": [
          {
            "name": "merchant_organization_id",
            "type": "string",
            "example": "<org-uuid>",
            "desc": ""
          },
          {
            "name": "product_code",
            "type": "string",
            "example": "GOLD_MONTHLY",
            "desc": ""
          },
          {
            "name": "product_name",
            "type": "string",
            "example": "Gold monthly plan",
            "desc": ""
          },
          {
            "name": "amount",
            "type": "string",
            "example": "999.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "anchor_day",
            "type": "number",
            "example": "5",
            "desc": ""
          },
          {
            "name": "mandate_type",
            "type": "string",
            "example": "UPI",
            "desc": ""
          }
        ],
        "response": "{\n  \"status\": \"success\",\n  \"subscription_id\": \"<uuid>\",\n  \"product_code\": \"GOLD_MONTHLY\",\n  \"amount\": 999.0,\n  \"anchor_day\": 5,\n  \"next_due_date\": \"2026-10-05\",\n  \"mandate_reference\": \"MANPRODACI2AP0000000000001000301459\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "sub-list",
        "title": "Subscriptions: List",
        "method": "GET",
        "path": "/api/v1/subscriptions",
        "summary": "List your subscriptions.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "GET /api/v1/subscriptions\nAuthorization: Bearer <sabbpe_token>"
          }
        ],
        "fields": [],
        "response": "{\n  \"status\": \"success\",\n  \"subscriptions\": [\n    {\n      \"subscription_id\": \"<uuid>\",\n      \"product_code\": \"GOLD_MONTHLY\",\n      \"subscription_status\": \"ACTIVE\",\n      \"amount\": 999.0,\n      \"anchor_day\": 5,\n      \"next_due_date\": \"2026-10-05\",\n      \"mandate_reference\": \"MANPRODACI2AP\\u2026\",\n      \"mandate_type\": \"UPI\"\n    }\n  ]\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "sub-pause",
        "title": "Subscriptions: Pause",
        "method": "POST",
        "path": "/api/v1/subscriptions/{id}/pause",
        "summary": "Pause a subscription.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "POST /api/v1/subscriptions/<subscription_id>/pause\nAuthorization: Bearer <sabbpe_token>"
          }
        ],
        "fields": [],
        "response": "{\n  \"status\": \"success\",\n  \"subscription_id\": \"<uuid>\",\n  \"product_code\": \"GOLD_MONTHLY\",\n  \"subscription_status\": \"PAUSED\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "sub-resume",
        "title": "Subscriptions: Resume",
        "method": "POST",
        "path": "/api/v1/subscriptions/{id}/resume",
        "summary": "Resume a paused subscription.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "POST /api/v1/subscriptions/<subscription_id>/resume\nAuthorization: Bearer <sabbpe_token>"
          }
        ],
        "fields": [],
        "response": "{\n  \"status\": \"success\",\n  \"subscription_id\": \"<uuid>\",\n  \"product_code\": \"GOLD_MONTHLY\",\n  \"subscription_status\": \"ACTIVE\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "sub-cancel",
        "title": "Subscriptions: Cancel",
        "method": "POST",
        "path": "/api/v1/subscriptions/{id}/cancel",
        "summary": "Cancel a subscription.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "POST /api/v1/subscriptions/<subscription_id>/cancel\nAuthorization: Bearer <sabbpe_token>"
          }
        ],
        "fields": [],
        "response": "{\n  \"status\": \"success\",\n  \"subscription_id\": \"<uuid>\",\n  \"product_code\": \"GOLD_MONTHLY\",\n  \"subscription_status\": \"CANCELLED\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      }
    ]
  },
  "enach": {
    "intro": "Register a bank mandate, then present debits against it.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/sabbpe/v1/token",
        "summary": "Get a token before calling any other API in this product. Send it as sabbpe_token in each request body.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_userid\": \"YOUR_USER_ID\",\n  \"sabbpe_merchantid\": \"YOUR_MERCHANT_ID\",\n  \"sabbpe_password\": \"YOUR_PASSWORD\",\n  \"timestamp\": \"2026-10-08 10:00:00\",\n  \"merchant_order_ref\": \"ORD-1001\",\n  \"service_code\": \"NACH_MANDATE\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_userid",
            "type": "string",
            "example": "YOUR_USER_ID",
            "desc": "Your SabbPe user ID."
          },
          {
            "name": "sabbpe_merchantid",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "sabbpe_password",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 10:00:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          },
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-1001",
            "desc": "Your unique reference for this request."
          },
          {
            "name": "service_code",
            "type": "string",
            "example": "NACH_MANDATE",
            "desc": "The service this token is for."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"transaction_id\": \"<txn-id>\",\n  \"sabbpe_token\": \"<token>\",\n  \"token_expiry_minutes\": 15,\n  \"message\": \"Token generated successfully\",\n  \"merchant_order_ref\": \"ORD-1001\"\n}",
        "failure": null,
        "errors": [],
        "notes": [
          "The token is valid for 15 minutes."
        ]
      },
      {
        "id": "enach-register",
        "title": "Register Mandate",
        "method": "POST",
        "path": "/api/v1/enach-registration",
        "summary": "Start an eNACH mandate that the customer approves on their bank's page.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"trxnno\": \"ENACH-20260929-001\",\n  \"enach_amount\": \"1000.00\",\n  \"frequencydeduction\": \"MNTH\",\n  \"mandatestartdate\": \"29092026\",\n  \"mandateenddate\": \"29092028\",\n  \"debittype\": \"F\",\n  \"bankcode\": \"HDFC\",\n  \"accountnumber\": \"1234567890\",\n  \"ifsc\": \"HDFC0001234\",\n  \"accountholdername\": \"Test Customer\",\n  \"authenticationmode\": \"ALL\",\n  \"accounttype\": \"SA\",\n  \"mobileno\": \"9876543210\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "trxnno",
            "type": "string",
            "example": "ENACH-20260929-001",
            "desc": ""
          },
          {
            "name": "enach_amount",
            "type": "string",
            "example": "1000.00",
            "desc": ""
          },
          {
            "name": "frequencydeduction",
            "type": "string",
            "example": "MNTH",
            "desc": ""
          },
          {
            "name": "mandatestartdate",
            "type": "string",
            "example": "29092026",
            "desc": ""
          },
          {
            "name": "mandateenddate",
            "type": "string",
            "example": "29092028",
            "desc": ""
          },
          {
            "name": "debittype",
            "type": "string",
            "example": "F",
            "desc": ""
          },
          {
            "name": "bankcode",
            "type": "string",
            "example": "HDFC",
            "desc": ""
          },
          {
            "name": "accountnumber",
            "type": "string",
            "example": "1234567890",
            "desc": ""
          },
          {
            "name": "ifsc",
            "type": "string",
            "example": "HDFC0001234",
            "desc": ""
          },
          {
            "name": "accountholdername",
            "type": "string",
            "example": "Test Customer",
            "desc": ""
          },
          {
            "name": "authenticationmode",
            "type": "string",
            "example": "ALL",
            "desc": ""
          },
          {
            "name": "accounttype",
            "type": "string",
            "example": "SA",
            "desc": ""
          },
          {
            "name": "mobileno",
            "type": "string",
            "example": "9876543210",
            "desc": ""
          }
        ],
        "response": "{\n  \"mandate_ref_no\": \"NH1000301436\",\n  \"trxn_no\": \"ENACH-20260929-001\",\n  \"enach_amount\": \"1000.00\",\n  \"status\": \"SUCCESS\",\n  \"status_desc\": \"NA\",\n  \"acceptance_ref_no\": \"555562608041211055\",\n  \"success_page\": \"Y\",\n  \"umn\": \"HDFC5555626080412110\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "enach-link",
        "title": "Register by Link",
        "method": "POST",
        "path": "/api/v1/enach-regbylink",
        "summary": "Create a link the customer opens to approve the mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"trxnno\": \"RBL-20260929-001\",\n  \"enach_amount\": \"1000.00\",\n  \"frequencydeduction\": \"MNTH\",\n  \"mandatestartdate\": \"29092026\",\n  \"mandateenddate\": \"29092028\",\n  \"debittype\": \"F\",\n  \"bankcode\": \"HDFC\",\n  \"accountnumber\": \"1234567890\",\n  \"ifsc\": \"HDFC0001234\",\n  \"accountholdername\": \"Test Customer\",\n  \"authenticationmode\": \"N\",\n  \"regbylink\": \"Y\",\n  \"shorturl\": \"Y\",\n  \"sendsms\": \"Y\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "trxnno",
            "type": "string",
            "example": "RBL-20260929-001",
            "desc": ""
          },
          {
            "name": "enach_amount",
            "type": "string",
            "example": "1000.00",
            "desc": ""
          },
          {
            "name": "frequencydeduction",
            "type": "string",
            "example": "MNTH",
            "desc": ""
          },
          {
            "name": "mandatestartdate",
            "type": "string",
            "example": "29092026",
            "desc": ""
          },
          {
            "name": "mandateenddate",
            "type": "string",
            "example": "29092028",
            "desc": ""
          },
          {
            "name": "debittype",
            "type": "string",
            "example": "F",
            "desc": ""
          },
          {
            "name": "bankcode",
            "type": "string",
            "example": "HDFC",
            "desc": ""
          },
          {
            "name": "accountnumber",
            "type": "string",
            "example": "1234567890",
            "desc": ""
          },
          {
            "name": "ifsc",
            "type": "string",
            "example": "HDFC0001234",
            "desc": ""
          },
          {
            "name": "accountholdername",
            "type": "string",
            "example": "Test Customer",
            "desc": ""
          },
          {
            "name": "authenticationmode",
            "type": "string",
            "example": "N",
            "desc": ""
          },
          {
            "name": "regbylink",
            "type": "string",
            "example": "Y",
            "desc": ""
          },
          {
            "name": "shorturl",
            "type": "string",
            "example": "Y",
            "desc": ""
          },
          {
            "name": "sendsms",
            "type": "string",
            "example": "Y",
            "desc": ""
          }
        ],
        "response": "{\n  \"short_url\": \"https://<mandate-approval-link>\",\n  \"errorcode\": \"RC000\",\n  \"status\": \"PENDING\",\n  \"ref_no\": \"NH1000299572\",\n  \"responseDate\": \"2026-07-23 12:07:28\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "enach-status",
        "title": "Mandate Status",
        "method": "POST",
        "path": "/api/v1/enach-status-check",
        "summary": "Check the status of an eNACH mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"trxn_no\": \"ENACH-20260929-001\",\n  \"merchantid\": \"885585\",\n  \"subbillerid\": \"662416\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "trxn_no",
            "type": "string",
            "example": "ENACH-20260929-001",
            "desc": ""
          },
          {
            "name": "merchantid",
            "type": "string",
            "example": "885585",
            "desc": ""
          },
          {
            "name": "subbillerid",
            "type": "string",
            "example": "662416",
            "desc": ""
          }
        ],
        "response": "{\n  \"mandate_ref_no\": \"NH1000301436\",\n  \"trxn_no\": \"ENACH-20260929-001\",\n  \"enach_amount\": \"1000.00\",\n  \"acceptance_ref_no\": \"555562608041211055\",\n  \"status\": \"SUCCESS\",\n  \"status_desc\": \"NA\",\n  \"umn\": \"HDFC5555626080412110\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "enach-cancel",
        "title": "Cancel Mandate",
        "method": "POST",
        "path": "/api/v1/enach-cancellation",
        "summary": "Cancel an eNACH mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"merchantid\": \"885585\",\n  \"subbillerid\": \"662416\",\n  \"consumer_ref_no\": \"ENACH-20260929-001\",\n  \"umrn\": \"HDFC5555626073111560\",\n  \"amount\": \"1000.00\",\n  \"rejected_by\": \"ADMIN\",\n  \"reason_desc\": \"Customer requested cancellation\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "merchantid",
            "type": "string",
            "example": "885585",
            "desc": ""
          },
          {
            "name": "subbillerid",
            "type": "string",
            "example": "662416",
            "desc": ""
          },
          {
            "name": "consumer_ref_no",
            "type": "string",
            "example": "ENACH-20260929-001",
            "desc": ""
          },
          {
            "name": "umrn",
            "type": "string",
            "example": "HDFC5555626073111560",
            "desc": ""
          },
          {
            "name": "amount",
            "type": "string",
            "example": "1000.00",
            "desc": "Amount in rupees."
          },
          {
            "name": "rejected_by",
            "type": "string",
            "example": "ADMIN",
            "desc": ""
          },
          {
            "name": "reason_desc",
            "type": "string",
            "example": "Customer requested cancellation",
            "desc": ""
          }
        ],
        "response": "{\n  \"MandateResList\": [\n    {\n      \"STATUS\": \"C\",\n      \"CONSUMERREFNO\": \"ENACH-20260929-001\",\n      \"UMRN\": \"HDFC5555626073111560\",\n      \"AMOUNT\": \"1000.00\",\n      \"REJECTEDBY\": \"ADMIN\",\n      \"REASONDESC\": \"Customer requested cancellation\"\n    }\n  ]\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "debit",
        "title": "Present Debit",
        "method": "POST",
        "path": "/api/v1/transact-ingress",
        "summary": "Send a debit instruction against an approved mandate.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"authenticationmode\": \"N\",\n  \"trxnBatchNo\": \"BAT-20260929-001\",\n  \"transactionRefNo\": \"TXN-20260929-0001\",\n  \"mandateRefNo\": \"NH1000301436\",\n  \"comRefNo\": \"ENACH-20260929-001\",\n  \"custName\": \"Test Customer\",\n  \"custId\": \"CUST-001\",\n  \"dueAmt\": \"1000.00\",\n  \"dueDate\": \"29092026\",\n  \"dueDay\": \"29\",\n  \"umrn\": \"HDFC5555626080412110\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "authenticationmode",
            "type": "string",
            "example": "N",
            "desc": ""
          },
          {
            "name": "trxnBatchNo",
            "type": "string",
            "example": "BAT-20260929-001",
            "desc": ""
          },
          {
            "name": "transactionRefNo",
            "type": "string",
            "example": "TXN-20260929-0001",
            "desc": ""
          },
          {
            "name": "mandateRefNo",
            "type": "string",
            "example": "NH1000301436",
            "desc": ""
          },
          {
            "name": "comRefNo",
            "type": "string",
            "example": "ENACH-20260929-001",
            "desc": ""
          },
          {
            "name": "custName",
            "type": "string",
            "example": "Test Customer",
            "desc": ""
          },
          {
            "name": "custId",
            "type": "string",
            "example": "CUST-001",
            "desc": ""
          },
          {
            "name": "dueAmt",
            "type": "string",
            "example": "1000.00",
            "desc": ""
          },
          {
            "name": "dueDate",
            "type": "string",
            "example": "29092026",
            "desc": ""
          },
          {
            "name": "dueDay",
            "type": "string",
            "example": "29",
            "desc": ""
          },
          {
            "name": "umrn",
            "type": "string",
            "example": "HDFC5555626080412110",
            "desc": ""
          }
        ],
        "response": "{\n  \"STATUS_CODE\": \"0\",\n  \"STATUS_DESC\": \"SUCCESS\",\n  \"TRANSACTION_REF_NO\": \"TXN-20260929-0001\",\n  \"TRXN_BATCH_NO\": \"BAT-20260929-001\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      },
      {
        "id": "debit-inquiry",
        "title": "Debit Inquiry",
        "method": "POST",
        "path": "/api/v1/transact-inquiry",
        "summary": "Check the result of a debit instruction.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"transactionRefNo\": \"TXN-20260929-0001\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "transactionRefNo",
            "type": "string",
            "example": "TXN-20260929-0001",
            "desc": ""
          }
        ],
        "response": "{\n  \"TRANSACTION_REF_NO\": \"TXN-20260929-0001\",\n  \"TRXN_BATCH_NO\": \"BAT-20260929-001\",\n  \"STATUS\": \"SUCCESS\",\n  \"STATUS_DATE\": \"2026-09-29 10:20:00\"\n}",
        "failure": null,
        "errors": [],
        "notes": []
      }
    ]
  },
  "pay-by-link": {
    "intro": "Generate a token, create the link, then track it. SabbPe sends the link to your customer by email and WhatsApp.",
    "endpoints": [
      {
        "id": "token",
        "title": "Generate Token",
        "method": "POST",
        "path": "/sabbpe/v1/token",
        "summary": "Get a short-lived token tied to your merchant account and your order reference.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_userid\": \"YOUR_USER_ID\",\n  \"sabbpe_merchantid\": \"YOUR_MERCHANT_ID\",\n  \"sabbpe_password\": \"YOUR_PASSWORD\",\n  \"timestamp\": \"2026-10-08 19:54:00\",\n  \"merchant_order_ref\": \"ORD-PBL-1001\",\n  \"service_code\": \"PAYMENT_GATEWAY\"\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_userid",
            "type": "string",
            "example": "YOUR_USER_ID",
            "desc": "Your SabbPe user ID."
          },
          {
            "name": "sabbpe_merchantid",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID."
          },
          {
            "name": "sabbpe_password",
            "type": "string",
            "example": "YOUR_PASSWORD",
            "desc": "Your SabbPe API password."
          },
          {
            "name": "timestamp",
            "type": "string",
            "example": "2026-10-08 19:54:00",
            "desc": "Current date and time, as yyyy-MM-dd HH:mm:ss."
          },
          {
            "name": "merchant_order_ref",
            "type": "string",
            "example": "ORD-PBL-1001",
            "desc": "Your unique reference for this request."
          },
          {
            "name": "service_code",
            "type": "string",
            "example": "PAYMENT_GATEWAY",
            "desc": "The service this token is for."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"transaction_id\": \"fb7e5cf8-c32a-11f1-911a-0800279fdc06\",\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"token_expiry_minutes\": 15,\n  \"message\": \"Token generated successfully\",\n  \"merchant_order_ref\": \"ORD-PBL-1001\"\n}",
        "failure": "{\n  \"status\": false,\n  \"transaction_id\": null,\n  \"sabbpe_token\": null,\n  \"token_expiry_minutes\": null,\n  \"message\": \"Invalid service credentials\",\n  \"merchant_order_ref\": null\n}",
        "errors": [
          {
            "message": "Missing sabbpe_userid / Missing sabbpe_password / Missing timestamp / Missing merchant_order_ref",
            "cause": "A required field is absent."
          },
          {
            "message": "Invalid timestamp format. Expected: yyyy-MM-dd HH:mm:ss",
            "cause": "The timestamp is in the wrong format."
          },
          {
            "message": "Invalid timestamp. Only +/- 5 minutes from server time is allowed",
            "cause": "Your clock differs from the server by more than 5 minutes."
          },
          {
            "message": "merchant_order_ref already exists. Please use a new order reference",
            "cause": "The order reference has been used before."
          },
          {
            "message": "Service not subscribed: PBL",
            "cause": "Pay By Link is not active on your account."
          }
        ],
        "notes": [
          "The token is valid for 15 minutes.",
          "timestamp must be within 5 minutes of server time, in the format yyyy-MM-dd HH:mm:ss.",
          "service_code accepts PAYMENT_GATEWAY, PBL or PAY_BY_LINK.",
          "Each token can be used to create one link."
        ]
      },
      {
        "id": "generate",
        "title": "Generate Link",
        "method": "POST",
        "path": "/sabbpe/v1/paybylink/generate",
        "summary": "Create a payment link and send it to your customer.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"sabbpe_token\": \"<sabbpe_token>\",\n  \"amount\": 323,\n  \"description\": \"Order123\",\n  \"redirect_url\": \"https://yourstore.in/payment-result\",\n  \"customer\": {\n    \"firstname\": \"Asha\",\n    \"email\": \"name@example.com\",\n    \"phone\": \"9000000000\"\n  },\n  \"delivery\": {\n    \"channels\": [\n      \"EMAIL\",\n      \"WHATSAPP\"\n    ]\n  }\n}"
          }
        ],
        "fields": [
          {
            "name": "sabbpe_token",
            "type": "string",
            "example": "<sabbpe_token>",
            "desc": "Token returned by the Generate Token call."
          },
          {
            "name": "amount",
            "type": "number",
            "example": "323",
            "desc": "Amount in rupees."
          },
          {
            "name": "description",
            "type": "string",
            "example": "Order123",
            "desc": "What the payment is for. Shown to the customer."
          },
          {
            "name": "redirect_url",
            "type": "string",
            "example": "https://yourstore.in/payment-result",
            "desc": "Page the customer lands on after paying."
          },
          {
            "name": "customer.firstname",
            "type": "string",
            "example": "Asha",
            "desc": "Customer name."
          },
          {
            "name": "customer.email",
            "type": "string",
            "example": "name@example.com",
            "desc": "Customer email."
          },
          {
            "name": "customer.phone",
            "type": "string",
            "example": "9000000000",
            "desc": "Customer mobile number."
          },
          {
            "name": "delivery.channels",
            "type": "array",
            "example": "[\"EMAIL\", \"WHATSAPP\"]",
            "desc": "How the link is sent: EMAIL, WHATSAPP, or both. Defaults to both."
          }
        ],
        "response": "{\n  \"status\": true,\n  \"pbl_order_ref\": \"PBLMUZOH2JQ760\",\n  \"merchant_order_ref\": \"ORD-PBL-1001\",\n  \"link_status\": \"SENT\",\n  \"delivery\": {\n    \"email\": {\n      \"status\": \"SENT\",\n      \"detail\": \"Email sent successfully\"\n    },\n    \"whatsapp\": {\n      \"status\": \"SENT\",\n      \"detail\": \"WhatsApp message accepted for delivery\"\n    }\n  },\n  \"message\": \"Payment link created and delivered\"\n}",
        "failure": "{\n  \"status\": false,\n  \"pbl_order_ref\": null,\n  \"merchant_order_ref\": null,\n  \"link_status\": null,\n  \"delivery\": null,\n  \"message\": \"Token already used or invalid\"\n}",
        "errors": [
          {
            "message": "Missing sabbpe_token",
            "cause": "The token is absent."
          },
          {
            "message": "Invalid amount",
            "cause": "The amount is missing, zero or negative."
          },
          {
            "message": "Missing customer details (firstname, email, phone)",
            "cause": "The customer object is incomplete."
          },
          {
            "message": "Missing redirect_url",
            "cause": "No redirect_url was sent and none is set on your account."
          },
          {
            "message": "Unsupported delivery channel: X",
            "cause": "A channel other than EMAIL or WHATSAPP was sent."
          },
          {
            "message": "Unable to generate payment link. Please try again.",
            "cause": "The link could not be created (HTTP 500)."
          }
        ],
        "notes": [
          "The response does not contain the payment URL. It returns the link reference and the delivery status for each channel.",
          "Keep the pbl_order_ref. You need it to check the status.",
          "currency is not needed. It is taken from your account."
        ]
      },
      {
        "id": "status",
        "title": "Link Status",
        "method": "POST",
        "path": "/sabbpe/v1/paybylink/status",
        "summary": "Check the status of one payment link.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"pbl_order_ref\": \"PBLMUZMOFYI283\",\n  \"merchant_id\": \"YOUR_MERCHANT_ID\"\n}"
          }
        ],
        "fields": [
          {
            "name": "pbl_order_ref",
            "type": "string",
            "example": "PBLMUZMOFYI283",
            "desc": "The link reference returned when the link was created."
          },
          {
            "name": "merchant_id",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID. Use the merchant ID, not the user ID."
          }
        ],
        "response": "{\n  \"pbl_order_ref\": \"PBLMUZMOFYI283\",\n  \"merchant_order_ref\": \"ORD-PBL-1000\",\n  \"master_transaction_id\": \"fbf83759-c323-11f1-911a-0800279fdc06\",\n  \"amount\": 323.0,\n  \"currency\": \"INR\",\n  \"description\": \"Order123\",\n  \"customer\": {\n    \"firstname\": \"Asha\",\n    \"email\": \"name@example.com\",\n    \"phone\": \"9000000000\"\n  },\n  \"channels\": \"EMAIL,WHATSAPP\",\n  \"link_status\": \"PAID\",\n  \"payment_status\": \"SUCCESS\",\n  \"created_at\": \"2026-10-08T19:54:49\",\n  \"sent_at\": \"2026-10-08T19:54:49\",\n  \"payment_completed_at\": \"2026-10-08T19:55:18\",\n  \"expires_at\": null,\n  \"callback_forwarded\": false,\n  \"callback_response\": null\n}",
        "failure": "{\n  \"status\": false,\n  \"message\": \"PBL transaction not found\"\n}",
        "errors": [
          {
            "message": "Missing pbl_order_ref",
            "cause": "A required field is absent."
          },
          {
            "message": "Missing merchant_id",
            "cause": "A required field is absent."
          }
        ],
        "notes": [
          "link_status is one of CREATED, SENT, DELIVERY_FAILED, PAID, FAILED or EXPIRED."
        ]
      },
      {
        "id": "transactions",
        "title": "List Links",
        "method": "POST",
        "path": "/sabbpe/v1/paybylink/transactions",
        "summary": "List your payment links, a page at a time, with optional filters.",
        "headers": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ],
        "examples": [
          {
            "label": "Request",
            "body": "{\n  \"merchant_id\": \"YOUR_MERCHANT_ID\",\n  \"status\": \"\",\n  \"date_from\": \"\",\n  \"date_to\": \"\",\n  \"page\": 1,\n  \"size\": 20\n}"
          }
        ],
        "fields": [
          {
            "name": "merchant_id",
            "type": "string",
            "example": "YOUR_MERCHANT_ID",
            "desc": "Your SabbPe merchant ID. Use the merchant ID, not the user ID."
          },
          {
            "name": "status",
            "type": "string",
            "example": "",
            "desc": "Filter by link status. Leave blank for all."
          },
          {
            "name": "date_from",
            "type": "string",
            "example": "",
            "desc": "Start date, yyyy-MM-dd. Optional."
          },
          {
            "name": "date_to",
            "type": "string",
            "example": "",
            "desc": "End date, yyyy-MM-dd. Optional."
          },
          {
            "name": "page",
            "type": "number",
            "example": "1",
            "desc": "Page number, starting at 1."
          },
          {
            "name": "size",
            "type": "number",
            "example": "20",
            "desc": "Links per page."
          }
        ],
        "response": "{\n  \"total\": 2,\n  \"page\": 1,\n  \"size\": 20,\n  \"items\": [\n    {\n      \"pbl_order_ref\": \"PBLMUZOH2JQ760\",\n      \"merchant_order_ref\": \"ORD-PBL-1001\",\n      \"master_transaction_id\": \"fb7e5cf8-c32a-11f1-911a-0800279fdc06\",\n      \"amount\": 323.0,\n      \"currency\": \"INR\",\n      \"description\": \"Order123\",\n      \"customer\": {\n        \"firstname\": \"Asha\",\n        \"email\": \"name@example.com\",\n        \"phone\": \"9000000000\"\n      },\n      \"channels\": \"EMAIL,WHATSAPP\",\n      \"link_status\": \"PAID\",\n      \"payment_status\": \"SUCCESS\",\n      \"created_at\": \"2026-10-08T20:45:05\",\n      \"sent_at\": \"2026-10-08T20:45:05\",\n      \"payment_completed_at\": \"2026-10-08T20:46:04\",\n      \"expires_at\": null,\n      \"callback_forwarded\": false,\n      \"callback_response\": null\n    },\n    {\n      \"pbl_order_ref\": \"PBLMUZMOFYI283\",\n      \"merchant_order_ref\": \"ORD-PBL-1000\",\n      \"master_transaction_id\": \"fbf83759-c323-11f1-911a-0800279fdc06\",\n      \"amount\": 323.0,\n      \"currency\": \"INR\",\n      \"description\": \"Order123\",\n      \"customer\": {\n        \"firstname\": \"Asha\",\n        \"email\": \"name@example.com\",\n        \"phone\": \"9000000000\"\n      },\n      \"channels\": \"EMAIL,WHATSAPP\",\n      \"link_status\": \"SENT\",\n      \"payment_status\": \"PENDING\",\n      \"created_at\": \"2026-10-08T19:53:29\",\n      \"sent_at\": \"2026-10-08T19:53:29\",\n      \"payment_completed_at\": null,\n      \"expires_at\": null,\n      \"callback_forwarded\": false,\n      \"callback_response\": null\n    }\n  ]\n}",
        "failure": "{\n  \"status\": false,\n  \"message\": \"Missing merchant_id\"\n}",
        "errors": [
          {
            "message": "Missing merchant_id",
            "cause": "A required field is absent."
          },
          {
            "message": "Invalid status: X",
            "cause": "The status is not one of the allowed values."
          },
          {
            "message": "Invalid date (expected yyyy-MM-dd): X",
            "cause": "A date is in the wrong format."
          }
        ],
        "notes": [
          "status is optional: CREATED, SENT, DELIVERY_FAILED, PAID, FAILED or EXPIRED. Leave it blank for all.",
          "date_from and date_to are optional, in the format yyyy-MM-dd.",
          "A malformed request body returns { \"status\": 400, \"message\": \"Invalid request.\", \"errorCode\": \"BAD_REQUEST\" }."
        ]
      }
    ]
  }
};
