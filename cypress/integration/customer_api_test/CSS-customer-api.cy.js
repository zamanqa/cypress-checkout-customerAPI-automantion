import "../../support/customer_api/cssCommands";

describe('Customer Self Service-CSS', () => {
  it('Test 1: Should fetch deliveries and include billing_date in response', () => {
    const subscriptionId = '5981921247370_681ca8a160d51_44341709570186';

    cy.getSubscriptionDeliveries(subscriptionId).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Test 2: Should report an issue for a subscription and confirm success message', () => {
    const subscriptionId = '5981921247370_681ca8a160d51_44341709570186';
  
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

  
  it('Test 3: Should update shipping date using deliveryId fetched from DB', () => {
    const subscriptionId = '15211';
    
    // Generate date for today + 3 days in YYYY-MM-DD format
    const shippingDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
  
    cy.getLatestDeliveryIdBySubscription(subscriptionId).then((deliveryId) => {
      expect(deliveryId).to.exist;
      
      cy.updateShippingDate(deliveryId, shippingDate).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('success', true);
        expect(response.body).to.have.property('message', 'Updated');
      });
    });
  });


  it('Test 4: Should change subscription frequency using custom command', () => {
    const subscriptionId = '5981921247370_681ca8a160d51_44341709570186';
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
    const productVariantId = '7300';
  
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
        AND payment_method_token IN ('visa')
      ORDER BY created_at ASC 
      LIMIT 1;
    `;
    
    // Fetch the subscriptionId from the DB
    cy.task('queryDb', query).then((result) => {
      const subscriptionId = result[0].subscription_id;
  
      const payload = {
        customer_email: "c.test2489@gmail.com",
        cancellation_reason: "Normal Cancellations",
        cancellation_type: "normal_cancellation",
        early_cancellation: false,
        message: "Test",
        pickup: {
          delivery_date: "2027-07-26",
          timeslot: {
            from: "08:00",
            to: "12:00"
          }
        }
      };
  
      cy.cancelSubscription(subscriptionId, payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property(
          'message',
          'Subscription cancelled, mail sent and note saved.'
        );
      });
    });
  });

  it('Test 7: Should process buyout', () => {
    // Query to fetch subscription_id
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
      AND o.payment_status IN ('paid','payment_pending')
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
        throw new Error('No active subscription found with visa payment method');
      }
    });
  });
  


});
