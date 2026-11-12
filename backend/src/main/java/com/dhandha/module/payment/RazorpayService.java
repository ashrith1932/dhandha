package com.dhandha.module.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;

@Service
public class RazorpayService {

    @Value("${dhandha.razorpay.key-id}")
    private String keyId;

    @Value("${dhandha.razorpay.key-secret}")
    private String keySecret;

    @Value("${dhandha.razorpay.webhook-secret}")
    private String webhookSecret;

    /**
     * Creates a gateway order with minor units (INR Paise)
     */
    public String createOrder(BigDecimal amountInRupees, String receiptPrefix, UUID referenceId) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        // Convert INR to Paise (e.g. ₹150.00 -> 15000 paise)
        long amountInPaise = amountInRupees.multiply(new BigDecimal(100)).setScale(0, RoundingMode.HALF_UP).longValue();

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", receiptPrefix + "_" + referenceId.toString().substring(0, 8));
        orderRequest.put("payment_capture", 1); // Auto capture

        Order order = client.orders.create(orderRequest);
        return order.get("id");
    }

    /**
     * Verifies Razorpay payment signature
     */
    public boolean verifyPaymentSignature(String orderId, String paymentId, String signature) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);

            return Utils.verifyPaymentSignature(options, keySecret);
        } catch (RazorpayException e) {
            return false;
        }
    }

    /**
     * Verifies Webhook HMAC SHA256 signature
     */
    public boolean verifyWebhookSignature(String requestBody, String signatureHeader) {
        try {
            return Utils.verifyWebhookSignature(requestBody, signatureHeader, webhookSecret);
        } catch (RazorpayException e) {
            return false;
        }
    }
}
