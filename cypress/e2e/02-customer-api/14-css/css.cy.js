import "../../support/customer_api/cssCommands";

describe('Customer Self Service-CSS', () => {
  it('Test: Should fetch subscription deliveries and include billing_date in response', () => {
  const subscriptionId = '6492735176842_696389f878eb6_44341709570186';

  cy.getSubscriptionDeliveries(subscriptionId).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body[0]).to.have.property('billing_date');
  });
});


it('Test 2: Should report an issue for a subscription and confirm success message', () => {
    const subscriptionId = '6492735176842_696389f878eb6_44341709570186';
  
    const issuePayload = {
      customer_email: "c.test2489@gmail.com",
      message: "reported an issue",
      appointment: {
        date: "2025-03-01",
        timeslot: {
          from: "10:00",
          to: "11:00"
        }
      }
    };
  
    cy.reportSubscriptionIssue(subscriptionId, issuePayload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        'message',
        'Issue reported, mail sent and note saved.'
      );
    });
  });

  
it('Test 3:Should update shipping date using deliveryId fetched from DB', () => {
  const subscriptionId = '15825';
  const shippingDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  cy.getLatestDeliveryIdBySubscription(subscriptionId).then((deliveryId) => {
  console.log('Fetched Delivery ID:', deliveryId); // Log to verify
  expect(deliveryId).to.exist;

    
cy.updateShippingDate(deliveryId, shippingDate).then((response) => {
    console.log('Response:', response); // Log the response for debugging
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('success', true);
    expect(response.body).to.have.property('message', 'Updated');
    });
  });
});



  it('Test 4: Should change subscription frequency using custom command', () => {
    const subscriptionId = '6490754515082_69610f0a392dc_44341709570186';
    const randomInterval = Math.floor(Math.random() * 3) + 1;
  
    cy.changeSubscriptionFrequency(subscriptionId, randomInterval).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        'message',
        'Subscription frequency / interval changed.'
      );
      cy.log(`Changed to interval: ${randomInterval}`);
    });
  });


  it('Test 5: Should perform bundle swap successfully', () => {
    const subscriptionId = '5981921247370_681ca8a160d51_44341709570186';
    const productVariantId = '7824';
  
    cy.bundleSwap(subscriptionId, productVariantId).then((response) => {
      expect(response.status).to.eq(202);
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message', 'Bundle swapped');
    });
  });


it('Test 6: Should cancel a subscription with valid details', () => {
  const query = `
    SELECT subscription_id FROM subscriptions s 
    WHERE company_id IN ('734f-4c766638po')
      AND id != 15211
      AND (status IN ('active'))
      AND (subscription_type IN ('normal'))
    ORDER BY created_at ASC 
    LIMIT 1;
  `;

  cy.task('queryDb', query).then((result) => {
    const subscriptionId = result[0].subscription_id;

    const cancelPayload = {
      customer_email: "c.test2489@gmail.com",
      cancellation_reason: "Normal Cancellations",
      cancellation_type: "normal_cancellation",
      early_cancellation: false,
      message: "Test",
      pickup: {
        delivery_date: "2023-07-26",
        timeslot: {
          from: "08:00",
          to: "12:00"
        }
      }
    };

    cy.cancelSubscription(subscriptionId, cancelPayload);
  });
});




  it('Test 7: Should process buyout for a subscription with stripe payment provider', () => {
  // Updated query to fetch subscription_id
  const query = `
    SELECT s.subscription_id
    FROM subscriptions s 
    LEFT JOIN orders o ON s.order_id = o.order_id
    WHERE s.company_id IN ('734f-4c766638po')
      AND s.id != 15211
      AND s.status IN ('active')
      AND s.subscription_type IN ('normal')
      AND s.payment_method_token NOT IN ('offlinegateway', 'invoice')
      AND o.payment_provider IN ('stripe')
      AND o.status IN ('open', 'TEST', 'fulfilled')
      AND o.payment_status IN ('paid')
    ORDER BY s.created_at DESC
    LIMIT 1;
  `;

  // Execute the query and get the subscription_id
  cy.task('queryDb', query).then((result) => {
    if (result && result.length > 0) {
      const subscriptionId = result[0].subscription_id;

      // Define the buyout request body
      const buyoutPayload = {
        buyout_legal: [
          { tag: "TermsAndConditions", value: true },
          { tag: "newsletter", value: true }
        ]
      };

      // Call the endpoint to process buyout
      cy.processBuyout(subscriptionId, buyoutPayload).then((response) => {
        expect(response.status).to.eq(200);
      });
    } else {
      throw new Error('No active subscription found with the specified criteria');
    }
  });
});

  


});
